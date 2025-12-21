# AlzGuard
Remaking a working full stack AlzGuard from scratch to review good coding principles and to jog my memory on how to build a frontend and backend.

## Rules For Myself
- No AI-generated code whatsoever
  - I will code everything by myself to really take in the different concepts, syntax, and logic
- I will read docs instead of asking AI
- I will only use AI for code review and ask it for explanation if I did anything wrong (or right)
- Commit frequently

## Project Overview
1. User enters their medical information and uploads an MRI scan.
2. Backend uses CNN to detect whether patient has Alzheimer's (if any early signs are showing).
3. Result and accuracy of result are returned to frontend.

## Architecture
### Frontend
- Clean display
- Form with upload
- Uses React, TypeScript, and Tailwind
  - No Next.js, Redux, etc. to relearn the foundation of frontend coding
- Shows results with charts

### Backend
- Takes form data and feeds it into ML pipeline
- Uses FastAPI

### ML
- Performs data cleaning, data preprocessing, EDA, data visualization, train-test splitting, CNN computation, and model evaluation
- Uses TensorFlow, scikit-learn, NumPy, pandas, Matplotlib, and Seaborn

## Current Status
Day 0 complete.
