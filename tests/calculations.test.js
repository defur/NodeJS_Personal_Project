const { test, expect } = require('@jest/globals');

const { calculateTotalScore, isValidScore } = require('../utils/calculations.js');

describe('Real Calculations', () => {
  test('calculateTotalScore should work', () => {
    expect(calculateTotalScore(90, 85, 88)).toBe(263);
    expect(calculateTotalScore(100, 100, 100)).toBe(300);
    expect(calculateTotalScore('90', '85', '88')).toBe(263);
  });

  test('isValidScore should validate scores', () => {
    expect(isValidScore(50)).toBe(true);
    expect(isValidScore(100)).toBe(true);
    expect(isValidScore(0)).toBe(true);
    expect(isValidScore(101)).toBe(false);
    expect(isValidScore(-1)).toBe(false);
    expect(isValidScore('abc')).toBe(false);
  });
});