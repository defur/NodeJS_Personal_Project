import dotenv from 'dotenv';

// Load test environment variables
dotenv.config();

// Mock database for tests
jest.mock('../db.js', () => {
  return {
    query: jest.fn()
  };
});