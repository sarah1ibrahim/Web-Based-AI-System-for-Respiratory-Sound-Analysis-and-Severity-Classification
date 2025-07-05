"""
FastAPI application for respiratory sound analysis.
"""
import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uvicorn

# Import our audio processing module
from process_audio import process_audio_file

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


# Response model
class AnalysisResponse(BaseModel):
    diagnosis: str
    severity: Optional[str] = None
    recommendations: Dict[str, Any]


@app.get("/")
async def root():
    """Root endpoint to verify API is working."""
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
    if not file.filename.endswith(('.wav', '.mp3', '.ogg', '.flac')):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a .wav, .mp3, .ogg, or .flac file."
        )
    
    try:
        # Save the uploaded file temporarily
        temp_file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process the audio file
        result = process_audio_file(temp_file_path)
        
        # Clean up the temporary file
        os.remove(temp_file_path)
        
        return result
    
    except Exception as e:
        # Clean up if an error occurs
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        
        raise HTTPException(
            status_code=500,
            detail=f"Error processing audio file: {str(e)}"
        )


# Run the app with uvicorn when the script is executed directly
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)