"""
Audio processing module for respiratory sound analysis.
This module handles loading ML models and processing audio files.
"""
import os
import numpy as np
import librosa
import joblib
from typing import Dict, Any


# Paths to model files
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
DIAGNOSIS_MODEL_PATH = os.path.join(MODEL_DIR, "diagnosis_model.pkl")
SEVERITY_MODEL_PATH = os.path.join(MODEL_DIR, "severity_model.pkl")
LABEL_ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder_diag.pkl")


# Load models
def load_models():
    """Load all ML models needed for prediction."""
    try:
        diagnosis_model = joblib.load(DIAGNOSIS_MODEL_PATH)
        severity_model = joblib.load(SEVERITY_MODEL_PATH)
        label_encoder = joblib.load(LABEL_ENCODER_PATH)
        
        print("Models loaded successfully")
        return diagnosis_model, severity_model, label_encoder
    except Exception as e:
        print(f"Error loading models: {e}")
        raise


# Feature extraction
def extract_features(audio_path: str) -> np.ndarray:
    """
    Extract audio features from a file.
    
    Args:
        audio_path: Path to the audio file
        
    Returns:
        np.ndarray: Feature vector
    """
    try:
        # Load audio file
        audio, sr = librosa.load(audio_path, sr=22050)
        
        # Extract MFCC features
        mfcc = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfcc, axis=1)
        
        # Extract other acoustic features
        spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=audio, sr=sr))
        spectral_rolloff = np.mean(librosa.feature.spectral_rolloff(y=audio, sr=sr))
        zcr = np.mean(librosa.feature.zero_crossing_rate(y=audio))
        chroma = np.mean(librosa.feature.chroma_stft(y=audio, sr=sr), axis=1)
        
        # Combine all features
        features = np.concatenate([mfcc_mean, [spectral_centroid, spectral_rolloff, zcr], chroma])
        return features
    except Exception as e:
        print(f"Error extracting features: {e}")
        raise


# Process uploaded audio file
def process_audio_file(audio_path: str) -> Dict[str, Any]:
    """
    Process an audio file and return diagnosis and severity.
    
    Args:
        audio_path: Path to the audio file
        
    Returns:
        Dict with diagnosis, severity, and recommendations
    """
    # Load models
    diagnosis_model, severity_model, label_encoder = load_models()
    
    # Extract features
    features = extract_features(audio_path)
    
    # Add placeholder values for crackles and wheezes (since we don't have annotations)
    # For real analysis, you'd need to detect these from the audio
    features_with_symptoms = np.concatenate([features, [0, 0]]).reshape(1, -1)
    
    # Predict diagnosis
    diagnosis_encoded = diagnosis_model.predict(features.reshape(1, -1))
    diagnosis = label_encoder.inverse_transform(diagnosis_encoded)[0]
    
    # Predict severity (if not healthy)
    severity = None
    if diagnosis != "Healthy":
        severity = severity_model.predict(features_with_symptoms)[0]
    
    # Generate recommendations
    advice = get_recommendations(diagnosis, severity)
    
    return {
        "diagnosis": diagnosis,
        "severity": severity,
        "recommendations": advice
    }


# Provide recommendations based on diagnosis and severity
def get_recommendations(diagnosis: str, severity: str = None) -> Dict[str, Any]:
    """
    Generate recommendations based on diagnosis and severity.
    
    Args:
        diagnosis: The diagnosis string
        severity: The severity level (or None for Healthy)
        
    Returns:
        Dict with symptoms, advice, and medical guidance
    """
    # Define common symptoms for each diagnosis
    symptoms = {
        "COPD": "Shortness of breath, chronic cough, wheezing, chest tightness",
        "Pneumonia": "Cough with phlegm, fever, chills, shortness of breath",
        "Bronchiectasis": "Chronic cough with mucus, recurrent infections, fatigue",
        "Bronchiolitis": "Wheezing, rapid breathing, cough, difficulty feeding (in infants)",
        "URTI": "Sore throat, runny nose, cough, congestion, mild fever",
        "Healthy": "No respiratory symptoms detected",
        "Other": "Various respiratory symptoms detected"
    }
    
    # Define exercise recommendations
    exercises = {
        "COPD": [
            "Diaphragmatic breathing exercises (10 mins, 3x daily)",
            "Pursed-lip breathing during physical activity",
            "Upper limb exercises to improve breathing capacity"
        ],
        "Pneumonia": [
            "Deep breathing exercises (5 mins, every 2 hours while awake)",
            "Incentive spirometry if available",
            "Gentle walking as tolerated"
        ],
        "Bronchiectasis": [
            "Airway clearance techniques (active cycle of breathing)",
            "Postural drainage positions",
            "Regular moderate aerobic exercise"
        ],
        "Bronchiolitis": [
            "Maintain hydration",
            "Humidified air to ease breathing",
            "Regular nasal suctioning if needed (for infants)"
        ],
        "URTI": [
            "Steam inhalation (with caution)",
            "Adequate rest and hydration",
            "Gentle walking or light activity as tolerated"
        ],
        "Healthy": [
            "Regular aerobic exercise (30 mins, 5x weekly)",
            "Breathing exercises for lung capacity maintenance",
            "Consider incorporating yoga or swimming for respiratory health"
        ],
        "Other": [
            "Diaphragmatic breathing exercises",
            "Moderate physical activity as tolerated",
            "Consult specialist for tailored exercise program"
        ]
    }
    
    # Define medical advice based on severity
    medical_advice = {
        "Healthy": "No specific medical intervention required. Maintain regular health check-ups.",
        "I": "Monitor symptoms. Follow-up with healthcare provider if symptoms persist or worsen.",
        "II": "Consult with a healthcare provider for proper assessment and management plan.",
        "III": "Schedule appointment with pulmonologist or respiratory specialist within 1-2 weeks.",
        "IV": "Seek immediate medical attention. May require hospitalization or intensive treatment."
    }
    
    # Get appropriate advice based on diagnosis and severity
    symptom_text = symptoms.get(diagnosis, "Respiratory symptoms requiring evaluation")
    advice_list = exercises.get(diagnosis, ["Consult healthcare provider for specific recommendations"])
    medical_text = medical_advice.get(severity if severity else "Healthy", "Consult healthcare provider for evaluation")
    
    return {
        "symptoms": symptom_text,
        "advice": advice_list,
        "medicalAdvice": medical_text
    }

# """
# Simplified audio processing module for testing.
# """
# from typing import Dict, Any

# def process_audio_file(audio_path: str) -> Dict[str, Any]:
#     """
#     Process an audio file and return dummy diagnosis and severity.
    
#     Args:
#         audio_path: Path to the audio file
        
#     Returns:
#         Dict with diagnosis, severity, and recommendations
#     """
#     # For testing - return dummy data
#     diagnosis = "URTI"
#     severity = "II"
    
#     # Generate recommendations
#     advice = {
#         "symptoms": "Sore throat, runny nose, cough, congestion, mild fever",
#         "advice": [
#             "Steam inhalation (with caution)",
#             "Adequate rest and hydration",
#             "Gentle walking or light activity as tolerated"
#         ],
#         "medicalAdvice": "Consult with a healthcare provider for proper assessment and management plan."
#     }
    
#     return {
#         "diagnosis": diagnosis,
#         "severity": severity,
#         "recommendations": advice
#     }