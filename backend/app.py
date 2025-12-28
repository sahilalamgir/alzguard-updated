from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("../ml/models/cnn_from_scratch.keras")

@app.post("/assess-risk")
def assess_risk(form_data: dict):
    print("hello")
    print(form_data)
    score = calculate_score(form_data)
    return [0.01, 0.22, 0.73, 0.04]

def preprocess_image(file):
    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=-1)
    img = np.expand_dims(img, axis=0)
    return img

def calculate_score(form_data: dict) -> float:
    # Demographic score
    if int(form_data["age"]) < 50:
        age_score = 0.0
    elif int(form_data["age"]) < 60:
        age_score = 0.2
    elif int(form_data["age"]) < 70:
        age_score = 0.4
    elif int(form_data["age"]) < 80:
        age_score = 0.7
    else:
        age_score = 1.0

    if form_data["sex"] == "male":
        sex_score = 0.4
    elif form_data["sex"] == "female":
        sex_score = 0.5
    else:
        sex_score = 0.45

    if form_data["educationLevel"] == "graduate":
        education_score = 0.2
    elif form_data["educationLevel"] == "undergraduate":
        education_score = 0.35
    elif form_data["educationLevel"] == "highSchool":
        education_score = 0.6
    else:
        education_score = 0.8

    demographic_score = (age_score + sex_score + education_score) / 3
    demographic_contribution = 0.20 * demographic_score

    # Medical score
    if form_data["familyHistory"] == "immediate":
        family_history_score = 1.0
    elif form_data["familyHistory"] == "extended":
        family_history_score = 0.6
    elif form_data["familyHistory"] == "none":
        family_history_score = 0.0
    else:
        family_history_score = 0.4

    cardio_score = 0.0
    cardiovascular = form_data.get("cardiovascularConditions", [])
    if "hypertension" in cardiovascular:
        cardio_score += 0.15
    if "diabetes" in cardiovascular:
        cardio_score += 0.15
    if "stroke" in cardiovascular:
        cardio_score += 0.30
    if "high cholesterol" in cardiovascular:
        cardio_score += 0.10
    cardio_score = min(cardio_score, 1.0)

    if form_data["smokingHistory"] == "never":
        smoking_score = 0.0
    elif form_data["smokingHistory"] == "former":
        smoking_score = 0.4
    elif form_data["smokingHistory"] == "current":
        smoking_score = 0.7
    else:
        smoking_score = 0.0

    medical_score = (0.4 * family_history_score +
                     0.4 * cardio_score +
                     0.2 * smoking_score)
    medical_contribution = 0.35 * medical_score

    # Cognitive symptom score
    if form_data["memoryIssues"] == "never":
        memory_score = 0.0
    elif form_data["memoryIssues"] == "sometimes":
        memory_score = 0.4
    elif form_data["memoryIssues"] == "often":
        memory_score = 0.7
    else:
        memory_score = 1.0

    if form_data["conversationalIssues"] == "never":
        conversation_score = 0.0
    elif form_data["conversationalIssues"] == "sometimes":
        conversation_score = 0.4
    elif form_data["conversationalIssues"] == "often":
        conversation_score = 0.7
    else:
        conversation_score = 1.0

    if form_data["misplacementIssues"] == "never":
        misplacement_score = 0.0
    elif form_data["misplacementIssues"] == "sometimes":
        misplacement_score = 0.4
    elif form_data["misplacementIssues"] == "often":
        misplacement_score = 0.7
    else:
        misplacement_score = 1.0

    symptom_score = (memory_score + conversation_score + misplacement_score) / 3
    symptom_contribution = 0.45 * symptom_score

    # Final clinical score
    clinical_score = (demographic_contribution +
                      medical_contribution +
                      symptom_contribution)

    return clinical_score

