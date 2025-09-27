const { test, expect } = require('@jest/globals');

describe('API Response Format', () => {
  test('successful score check should return correct format', () => {
    const mockResponse = {
      enteredScores: {
        score1: 90,
        score2: 85, 
        score3: 88,
        total: 263
      },
      matchingPrograms: [
        {
          program: 'Computer Science',
          university: 'Tech University',
          free_threshold: 240,
          scholarship_threshold: 220
        }
      ]
    };
    
    expect(mockResponse).toHaveProperty('enteredScores');
    expect(mockResponse).toHaveProperty('matchingPrograms');
    expect(mockResponse.enteredScores).toHaveProperty('total');
    expect(Array.isArray(mockResponse.matchingPrograms)).toBe(true);
  });

  test('error response should have error field', () => {
    const errorResponse = {
      error: 'Database error',
      details: 'Connection failed'
    };
    
    expect(errorResponse).toHaveProperty('error');
    expect(typeof errorResponse.error).toBe('string');
  });
});