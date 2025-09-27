const { test, expect } = require('@jest/globals');
describe('Real Calculator Logic', () => {
  test('should calculate total score like the server', () => {
    const calculateTotalScore = (score1, score2, score3) => {
      return parseInt(score1) + parseInt(score2) + parseInt(score3);
    };
    
    expect(calculateTotalScore('90', '85', '88')).toBe(263);
    expect(calculateTotalScore(100, 100, 100)).toBe(300);
  });

  test('should validate scores like the server', () => {
    const isValidScore = (score) => {
      return !isNaN(score) && score >= 0 && score <= 100;
    };
    
    expect(isValidScore(50)).toBe(true);
    expect(isValidScore(100)).toBe(true);
    expect(isValidScore(-1)).toBe(false);
    expect(isValidScore(101)).toBe(false);
    expect(isValidScore('not-a-number')).toBe(false);
  });
});