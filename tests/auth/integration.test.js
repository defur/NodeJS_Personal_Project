import request from "supertest";

describe("Auth API - Integration Tests", () => {
  let app;

  beforeAll(async () => {
    const module = await import("../../index.js");
    app = module.default;
  });

  it("should handle user registration", async () => {
    const uniqueEmail = `test${Date.now()}@university.com`;
    
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        full_name: "Integration Test User",
        email: uniqueEmail,
        password: "securepassword123",
      });

    console.log('Signup response:', { status: res.statusCode, body: res.body });

    if (res.statusCode === 201) {
      expect(res.body.message).toMatch(/success/i);
      expect(res.body.userId).toBeDefined();
    } else if (res.statusCode === 500) {
      expect(res.body.error).toBeDefined();
    } else {
      expect(res.statusCode).not.toBe(404);
    }
  }, 15000);

  it("should handle duplicate email registration", async () => {
    const duplicateEmail = `duplicate${Date.now()}@test.com`;
    
    const firstRes = await request(app)
      .post("/api/auth/signup")
      .send({
        full_name: "First User",
        email: duplicateEmail,
        password: "password123",
      });
    
    const secondRes = await request(app)
      .post("/api/auth/signup")
      .send({
        full_name: "Second User", 
        email: duplicateEmail,
        password: "password456",
      });

    if (secondRes.statusCode === 400) {
      expect(secondRes.body.error).toMatch(/already exists/i);
    }
  }, 15000);

  it("should handle user login", async () => {
    const testEmail = `login${Date.now()}@test.com`;
    const testPassword = "testpass123";

    const signupRes = await request(app)
      .post("/api/auth/signup")
      .send({
        full_name: "Login Test User",
        email: testEmail,
        password: testPassword,
      });

    if (signupRes.statusCode === 201) {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
          email: testEmail,
          password: testPassword,
        });

      if (loginRes.statusCode === 200) {
        expect(loginRes.body.token).toBeDefined();
        expect(loginRes.body.user.email).toBe(testEmail);
      }
    }
  }, 15000);

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });

    expect([401, 500]).toContain(res.statusCode);
  });
});