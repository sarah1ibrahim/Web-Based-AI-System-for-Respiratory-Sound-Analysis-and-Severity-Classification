import { useState } from 'react';
import axios from 'axios';

function RecordUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('path', file);

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/home/uploadAudio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: 'your_token_here'
        }
      });
      setMessage('File uploaded successfully! Redirecting to results...');
    } catch (error) {
      console.error('Error uploading file:', error);
      // setMessage('Error uploading file: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
      // Redirect immediately to /results regardless of success or failure
      window.location.href = '/results';
    }
  };

  return (
    <div className="upload-content" style={{ marginTop: 100 }}>
      <h2>Record or Upload Audio</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5>Guidelines</h5>
          <div className="guidelines-grid">
            <div className="guideline-card">
              <img src="/A+quiet+and+calm+place+in+forest.jpg" alt="Quiet Environment" className="guideline-image" />
              <p>Ensure a quiet environment for accurate recording.</p>
            </div>
            <div className="guideline-card">
              <img src="microphone-chest.jpg" alt="Microphone Near Chest" className="guideline-image" />
              <p>Place the microphone near your chest to capture clear audio.</p>
            </div>
            <div className="guideline-card">
              <img src="/deep-breaths.png" alt="Deep Breaths" className="guideline-image" />
              <p>Take deep breaths during recording for better analysis.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="audioFile" className="form-label">Upload Audio File</label>
              <input
                type="file"
                className="form-control"
                id="audioFile"
                accept="audio/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </>
              ) : (
                'Submit for Processing'
              )}
            </button>
          </form>
          {message && (
            <p className={`mt-3 ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordUpload;