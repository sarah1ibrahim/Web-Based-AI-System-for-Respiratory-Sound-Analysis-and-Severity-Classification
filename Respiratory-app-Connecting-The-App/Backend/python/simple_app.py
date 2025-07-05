"""
Simplified FastAPI application for respiratory sound analysis.
This version doesn't use complex ML models to avoid NumPy issues.
"""
import os
import shutil
import logging
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import our simplified audio processing module
from simple_process_audio import process_audio_file

# Create FastAPI app
app = FastAPI(title="Respiratory Sound Analysis API")

# Configure CORS to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directory for uploaded files if it doesn't exist
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "temp")
os.makedirs(UPLOAD_DIR, exist_ok=True)
logger.info(f"Using upload directory: {UPLOAD_DIR}")

# Response models
class RecommendationModel(BaseModel):
    symptoms: str
    advice: List[str]
    medicalAdvice: str

class AnalysisResponse(BaseModel):
    diagnosis: str
    severity: Optional[str] = None
    recommendations: RecommendationModel

@app.get("/")
async def root():
    """Root endpoint to verify API is working."""
    logger.info("Root endpoint called")
    return {"message": "Respiratory Sound Analysis API is running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_audio(file: UploadFile = File(...)):
    """
    Analyze an uploaded audio file and return diagnosis and severity.
    
    Args:
        file: Uploaded audio file
        
    Returns:
        AnalysisResponse with diagnosis, severity, and recommendations
    """
    logger.info(f"Received file: {file.filename}, content-type: {file.content_type}")
    
    # Check file format
    valid_formats = ('.wav', '.mp3', '.ogg', '.flac')
    if not file.filename.lower().endswith(valid_formats):
        error_msg = f"Unsupported file format. Please upload a {', '.join(valid_formats)} file."
        logger.warning(f"Invalid file format: {file.filename}")
        raise HTTPException(status_code=400, detail=error_msg)
    
    try:
        # Save the uploaded file temporarily
        temp_file_path = os.path.join(UPLOAD_DIR, file.filename)
        logger.info(f"Saving file to {temp_file_path}")
        
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process the audio file with simplified processor
        logger.info(f"Processing file {temp_file_path}")
        result = process_audio_file(temp_file_path)
        logger.info(f"Processing result: {result}")
        
        # Clean up the temporary file
        os.remove(temp_file_path)
        logger.info(f"Removed temporary file {temp_file_path}")
        
        return result
    
    except Exception as e:
        logger.error(f"Error during processing: {str(e)}", exc_info=True)
        
        # Clean up if an error occurs
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            logger.info(f"Removed temporary file after error {temp_file_path}")
        
        # Return a friendly error response
        raise HTTPException(
            status_code=500,
            detail=f"Error processing audio file: {str(e)}"
        )

# Run the app with uvicorn when the script is executed directly
if __name__ == "__main__":
    uvicorn.run("simple_app:app", host="127.0.0.1", port=8000, reload=True)