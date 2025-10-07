import request from "supertest";

describe("Auth Specific Lines Coverage", () => {
  let app;

  beforeAll(async () => {
    const module = await import("../../index.js");
    app = module.default;
  });

  // 13
  it("should validate required fields in signup", async () => {
    const testCases = [
      {}, 
      { email: "test@test.com" }, 
      { password: "123456" },
      { email: "", password: "123456" }, 
      { email: "test@test.com", password: "" }, 
    ];

    for (const testCase of testCases) {
      const res = await request(app)
        .post("/api/auth/signup")
        .send(testCase);

      if (Object.keys(testCase).length === 0 || !testCase.email || !testCase.password || testCase.email === "" || testCase.password === "") {
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/required/i);
      }
    }
  });

  //32-33
  it("should check for existing user before registration", async () => {
    const existingEmail = `existing${Date.now()}@test.com`;
    //first registr 
    const firstRes = await request(app)
      .post("/api/auth/signup")
      .send({
        email: existingEmail,
        password: "password123",
        full_name: "First User"
      });

    // 2-nd registr
    const secondRes = await request(app)
      .post("/api/auth/signup")
      .send({
        email: existingEmail,
        password: "differentpassword",
        full_name: "Second User"
      });

    if (firstRes.statusCode === 201) {
      expect(secondRes.statusCode).toBe(400);
      expect(secondRes.body.error).toMatch(/already exists/i);
    }
  });
});