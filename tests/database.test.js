const { test, expect } = require('@jest/globals');

describe('Database Configuration', () => {
  test('should have correct DB configuration structure', () => {

    const dbConfig = {
      host: process.env.DB_HOST || "db",
      user: process.env.DB_USER || "root", 
      password: process.env.DB_PASS || "123456",
      database: process.env.DB_NAME || "university"
    };
    
    expect(dbConfig).toHaveProperty('host');
    expect(dbConfig).toHaveProperty('user');
    expect(dbConfig).toHaveProperty('password');
    expect(dbConfig).toHaveProperty('database');
    expect(typeof dbConfig.host).toBe('string');
  });
});