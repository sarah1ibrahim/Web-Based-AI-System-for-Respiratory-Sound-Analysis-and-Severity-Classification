// Backend/setup.js
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir);
    console.log('✅ Uploads directory created');
} else {
    console.log('✅ Uploads directory already exists');
}

// Create Python models directory if it doesn't exist
const modelsDir = path.join(__dirname, 'python', 'models');
if (!fs.existsSync(modelsDir)) {
    console.log('Creating Python models directory...');
    fs.mkdirSync(modelsDir, { recursive: true });
    console.log('✅ Python models directory created');
} else {
    console.log('✅ Python models directory already exists');
}

// Create Python temp directory if it doesn't exist
const tempDir = path.join(__dirname, 'python', 'temp');
if (!fs.existsSync(tempDir)) {
    console.log('Creating Python temp directory...');
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('✅ Python temp directory created');
} else {
    console.log('✅ Python temp directory already exists');
}

console.log('\n✅ Setup complete!');
console.log('\nNext steps:');
console.log('1. Make sure your .pkl model files are in the python/models directory');
console.log('2. Install required Python packages by running:');
console.log('   pip install -r python/requirements.txt');
console.log('3. Start the FastAPI server by running:');
console.log('   cd python && uvicorn app:app --reload');
console.log('4. Start the Express server in a different terminal:');
console.log('   npm start');