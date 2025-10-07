import request from "supertest";

describe("API Health Checks", () => {
  let app;

  beforeAll(async () => {
    const module = await import("../../index.js");
    app = module.default;
  });

  it("should respond to basic health check", async () => {
    const res = await request(app)
      .get("/api/test");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API is working");
    expect(res.body.timestamp).toBeDefined();
  });

  it("should respond to database health check", async () => {
    const res = await request(app)
      .get("/api/test-db");

    expect([200, 500]).toContain(res.statusCode);
    
    if (res.statusCode === 200) {
      expect(res.body.status).toBe("DB connected");
    } else {
      expect(res.body.error).toMatch(/DB connection failed/i);
    }
  });
});