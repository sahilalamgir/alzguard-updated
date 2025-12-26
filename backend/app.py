from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/assessment")
def assess_data(form_data: dict):
    print("hello")
    print(form_data)
    score = 0
    if int(form_data["age"]) >= 65:
        score += 2
    if form_data["familyHistory"] == "immediate":
        score += 3
    if form_data["memoryIssues"] == "very often":
        score += 3
    if form_data["misplacementIssues"] == "very often":
        score += 2
    return {"final_score": score}
