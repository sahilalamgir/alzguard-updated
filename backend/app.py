from typing import List, Annotated, Literal
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image, UnidentifiedImageError
import uvicorn
from io import BytesIO
from pathlib import Path
import logging

from models.model_loader import load_model
from services.scoring_service import calculate_clinical_score
from services.image_service import preprocess_image

LABELS = ["Mild", "Moderate", "None", "Very Mild"]
RISK_WEIGHTS = {
    "NonDemented": 0.0,
    "VeryMildDemented": 0.33,
    "MildDemented": 0.66,
    "ModerateDemented": 1.0
}
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}
ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/gif'}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

model = load_model()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/assess-risk")
async def assess_risk(
    age: Annotated[int, Form(ge=0, le=120)],
    sex: Annotated[Literal["male", "female", "unspecified"], Form()],
    educationLevel: Annotated[Literal["lessThanHighSchool", "highSchool", "undergraduate", "graduate"], Form()],
    primaryLanguage: Annotated[Literal["english", "french", "spanish"], Form()],
    familyHistory: Annotated[Literal["immediate", "extended", "none", "unknown"], Form()],
    smokingHistory: Annotated[Literal["never", "former", "current"], Form()],
    memoryIssues: Annotated[Literal["never", "sometimes", "often", "always"], Form()],
    conversationalIssues: Annotated[Literal["never", "sometimes", "often", "always"], Form()],
    misplacementIssues: Annotated[Literal["never", "sometimes", "often", "always"], Form()],
    mriScan: UploadFile = File(...),
    conditionHistory: Annotated[List[Literal["hypertension", "diabetes", "stroke", "highCholesterol"]], Form()] = [],
):
    logger.info(f"Assessment received for age {age}")

    if not mriScan.filename:
        logger.warning(f"Invalid image upload attempt: {mriScan.filename}")
        raise HTTPException(
            status_code=400,
            detail="No file provided"
        )
    
    file_ext = Path(mriScan.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        logger.warning(f"Invalid file extension: {file_ext}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file_ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    if mriScan.content_type not in ALLOWED_MIME_TYPES:
        logger.warning(f"Invalid MIME type: {mriScan.content_type}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid content type '{mriScan.content_type}'. Expected image file."
        )
    
    contents = await mriScan.read(MAX_FILE_SIZE + 1)
    if len(contents) > MAX_FILE_SIZE:
        logger.warning(f"Uploaded file too large: {len(contents) / 1024 / 1024}MB")
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE / 1024 / 1024}MB"
        )

    try:
        img = Image.open(BytesIO(contents))
        img.verify()
        img = Image.open(BytesIO(contents))
    except UnidentifiedImageError:
        logger.warning(f"Invalid image upload attempt: {mriScan.filename}")
        raise HTTPException(
            status_code=400,
            detail="File is not a valid image"
        )
    except Exception as e:
        logger.warning(f"General exception occurred: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Invalid image file: {str(e)}"
        )

    form_data = {
        "age": age,
        "sex": sex,
        "educationLevel": educationLevel,
        "primaryLanguage": primaryLanguage,
        "familyHistory": familyHistory,
        "cardiovascularConditions": conditionHistory,
        "smokingHistory": smokingHistory,
        "memoryIssues": memoryIssues,
        "conversationalIssues": conversationalIssues,
        "misplacementIssues": misplacementIssues
    }

    logger.debug(f"Form data: {form_data}")

    clinical_score = calculate_clinical_score(form_data)
    preprocessed_img = preprocess_image(img)
    mri_prediction = model.predict(preprocessed_img)[0]

    logger.debug(f"Clinical score: {clinical_score}")
    logger.debug(f"MRI prediction: {mri_prediction}")

    cnn_confidence = max(mri_prediction)
    cnn_score = (
        mri_prediction[0] * RISK_WEIGHTS["MildDemented"] +
        mri_prediction[1] * RISK_WEIGHTS["ModerateDemented"] +
        mri_prediction[2] * RISK_WEIGHTS["NonDemented"] +
        mri_prediction[3] * RISK_WEIGHTS["VeryMildDemented"] 
    )
    final_score = 0.7 * cnn_score + 0.3 * clinical_score
    risk = risk_bucket(final_score)

    logger.debug(f"CNN confidence: {cnn_confidence}")
    logger.debug(f"CNN score: {cnn_score}")
    logger.debug(f"Final score: {final_score}")
    logger.debug(f"Risk level: {risk}")

    return {
        "labels": LABELS,
        "probabilities": mri_prediction.tolist(),
        "predicted_label": LABELS[np.argmax(mri_prediction)],
        "confidence": float(cnn_confidence),
        "final_score": float(final_score),
        "risk": risk
    }

def risk_bucket(p: float):
    if p <= 0.33:
        return "low"
    elif p <= 0.66:
        return "moderate"
    else:
        return "high"

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
