// Backend/routes/uploadAudio.js
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const { audioFile } = require('../models/audioFile');
const { verifyToken } = require('../middlewares/verfiyToken');

// Python FastAPI service URL
const PYTHON_API_URL = 'http://localhost:8000';

const fileUpload = (fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + ("_") + file.originalname);
        }
    });
    const upload = multer({ storage });
    return upload.single(fieldName);
};

router.post('/uploadAudio', verifyToken, fileUpload("path"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        console.log("The uploaded file:", req.file);
        
        // Send the file to the Python API for analysis
        const formData = new FormData();
        formData.append('file', fs.createReadStream(req.file.path));
        
        try {
            const pythonResponse = await axios.post(`${PYTHON_API_URL}/analyze`, formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });
            
            // Extract diagnosis data from Python API response
            const { diagnosis, severity, recommendations } = pythonResponse.data;
            
            // Save audio file and analysis results to database
            const audio = await audioFile.insertMany([{
                file_path: req.file.path,
                file_name: req.file.filename,
                user_id: req.user.id,
                diagnosis: diagnosis,
                severity: severity || null,
                advice: recommendations ? JSON.stringify(recommendations) : null
            }]);
            
            res.status(201).json({
                message: 'Audio uploaded, analyzed, and saved to DB',
                data: {
                    ...audio[0]._doc,
                    diagnosis,
                    severity,
                    recommendations
                }
            });
            
        } catch (pythonError) {
            console.error("Error calling Python API:", pythonError.message);
            
            // If Python API fails, still save the audio file without analysis
            const audio = await audioFile.insertMany([{
                file_path: req.file.path,
                file_name: req.file.filename,
                user_id: req.user.id
            }]);
            
            res.status(201).json({
                message: 'Audio uploaded and saved to DB, but analysis failed',
                data: audio[0],
                error: 'Analysis service is currently unavailable'
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

router.get('/history', verifyToken, async (req, res) => {
    try {
        const audioFiles = await audioFile
            .find({ user_id: req.user.id })
            .sort({ created_at: -1 }); // Newest first
        
        if (!audioFiles || audioFiles.length === 0) {
            return res.status(404).json({ message: "No audio files found" });
        }
        
        res.status(200).json(audioFiles);
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ error: error.message });
    }
});

// Export router for use in main application
module.exports = router;