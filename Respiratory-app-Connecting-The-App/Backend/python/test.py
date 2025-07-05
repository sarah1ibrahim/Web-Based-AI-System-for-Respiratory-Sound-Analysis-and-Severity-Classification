"""
Simple test script to check if the FastAPI service is working.
Save this in Backend/python/test_api.py
"""
import requests
import os
import sys

# Base URL of the FastAPI service
API_URL = "http://localhost:8000"

def test_root_endpoint():
    """Test the root endpoint of the API."""
    try:
        response = requests.get(f"{API_URL}/")
        if response.status_code == 200:
            print("✅ Root endpoint test passed!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Root endpoint test failed with status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API. Is the server running?")
        return False

def test_analyze_endpoint(file_path):
    """Test the analyze endpoint with an audio file."""
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    try:
        with open(file_path, 'rb') as f:
            files = {'file': (os.path.basename(file_path), f, 'audio/wav')}
            print(f"Sending file: {os.path.basename(file_path)}")
            response = requests.post(f"{API_URL}/analyze", files=files)
            
            if response.status_code == 200:
                print("✅ Analyze endpoint test passed!")
                print(f"Response: {response.json()}")
                return True
            else:
                print(f"❌ Analyze endpoint test failed with status code: {response.status_code}")
                print(f"Response: {response.text}")
                return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API. Is the server running?")
        return False
    except Exception as e:
        print(f"❌ Error during test: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("FastAPI Service Test")
    print("=" * 50)
    
    # Test root endpoint
    root_passed = test_root_endpoint()
    
    # Test analyze endpoint with a sample audio file
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        # Look for a .wav file in the uploads directory
        uploads_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
        if not os.path.exists(uploads_dir):
            print(f"❌ Uploads directory not found: {uploads_dir}")
            sys.exit(1)
        
        wav_files = [f for f in os.listdir(uploads_dir) if f.endswith('.wav')]
        if wav_files:
            file_path = os.path.join(uploads_dir, wav_files[0])
            print(f"Using file: {file_path}")
        else:
            print("❌ No .wav files found in uploads directory")
            sys.exit(1)
    
    analyze_passed = test_analyze_endpoint(file_path)
    
    print("\nSummary:")
    print(f"Root endpoint: {'✅ Passed' if root_passed else '❌ Failed'}")
    print(f"Analyze endpoint: {'✅ Passed' if analyze_passed else '❌ Failed'}")
    
    if root_passed and analyze_passed:
        print("\n✅ All tests passed! Your FastAPI service is working correctly.")
    else:
        print("\n❌ Some tests failed. Please check the errors and fix them.")