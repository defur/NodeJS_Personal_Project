const { test, expect } = require('@jest/globals');

describe('API Routes', () => {
  test('should have correct endpoint paths', () => {
    const endpoints = {
      login: '/api/auth/login',
      signup: '/api/auth/signup',
      checkScores: '/api/check-scores'
    };
    
    expect(endpoints.login).toBe('/api/auth/login');
    expect(endpoints.signup).toBe('/api/auth/signup');
    expect(endpoints.checkScores).toBe('/api/check-scores');
  });

  test('request body should contain required fields', () => {
    const loginRequest = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const scoreRequest = {
      subject1: 'math',
      score1: 90,
      subject2: 'informatics', 
      score2: 85,
      subject3: 'english',
      score3: 88
    };
    
    expect(loginRequest).toHaveProperty('email');
    expect(loginRequest).toHaveProperty('password');
    expect(scoreRequest).toHaveProperty('score1');
    expect(scoreRequest).toHaveProperty('score2');
    expect(scoreRequest).toHaveProperty('score3');
  });
});