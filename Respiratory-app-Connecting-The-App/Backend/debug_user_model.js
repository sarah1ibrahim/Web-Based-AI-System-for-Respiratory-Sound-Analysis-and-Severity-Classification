// Simple script to check User model and validation
// Save this as debug_user_model.js in your Backend directory

const { User, validateRegiterUser } = require('./models/User');

console.log("=== User Model Validation Check ===");

// Test the validation function
const testUser = {
  Name: "Test User",
  email: "test@example.com",
  password: "password123",
  Age: 30
};

console.log("Testing user validation with:", testUser);
const validationResult = validateRegiterUser(testUser);
console.log("Validation result:", validationResult);

// Test with missing fields
console.log("\nTesting with missing Name:");
const missingName = {
  email: "test@example.com",
  password: "password123",
  Age: 30
};
console.log("Validation result:", validateRegiterUser(missingName));

// Run this script with:
// node debug_user_model.js