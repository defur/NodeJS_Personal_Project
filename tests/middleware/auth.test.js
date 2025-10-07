import request from "supertest";
import jwt from "jsonwebtoken";

describe("Auth Middleware", () => {
  let app;

  beforeAll(async () => {
    const module = await import("../../index.js");
    app = module.default;
  });

  it("should allow access with valid token", async () => {
    const validToken = jwt.sign(
      { userId: 1, email: "test@example.com" },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .post("/api/check-scores")
      .set("Authorization", `Bearer ${validToken}`)
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    expect(res.statusCode).not.toBe(401);
    expect(res.statusCode).not.toBe(403);
    
    console.log(`Valid token test: ${res.statusCode} - ${res.body.error || 'Success'}`);
  }, 10000); 

  it("should reject request without token", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/token/i);
  });

  it("should reject request with invalid token", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .set("Authorization", "Bearer invalid-token-here")
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/invalid.*token/i);
  });

  it("should reject request with expired token", async () => {
    const expiredToken = jwt.sign(
      { userId: 1, email: "test@example.com" },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "-1h" }
    );

    const res = await request(app)
      .post("/api/check-scores")
      .set("Authorization", `Bearer ${expiredToken}`)
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/invalid.*token/i);
  });

  it("should reject request with malformed token", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .set("Authorization", "InvalidFormat")
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    expect(res.statusCode).toBe(401);
  });
});