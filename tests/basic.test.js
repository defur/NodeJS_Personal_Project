const { test, expect } = require('@jest/globals');

test('1 + 1 should equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('simple object test', () => {
  const obj = { name: 'test' };
  expect(obj.name).toBe('test');
});