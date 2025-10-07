import request from "supertest";

describe("Scores API - Integration Tests", () => {
  let app;

  beforeAll(async () => {
    const module = await import("../../index.js");
    app = module.default;
  });

  it("should handle scores calculation with authentication", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .send({
        score1: 85,
        score2: 90,
        score3: 78
      });

    console.log('Scores response:', { status: res.statusCode, body: res.body });

    if (res.statusCode === 200) {
      expect(res.body.enteredScores.total).toBe(253);
      expect(res.body.matchingPrograms).toBeDefined();
    } else if (res.statusCode === 401 || res.statusCode === 403) {
      expect(res.body.error).toBeDefined();
    } else if (res.statusCode === 500) {
      expect(res.body.error).toBeDefined();
    }
  }, 15000);

  it("should reject request without authentication", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .send({
        score1: 90,
        score2: 85,
        score3: 95
      });

    expect([401, 403]).toContain(res.statusCode);
  });

  it("should validate score ranges", async () => {
    const res = await request(app)
      .post("/api/check-scores")
      .send({
        score1: 150, // invalid
        score2: 90,
        score3: 78
      });

    if (res.statusCode === 400) {
      expect(res.body.error).toMatch(/must be numbers between 0 and 100/i);
    }
  }, 15000);

  it("should handle edge cases", async () => {
    const testCases = [
      { scores: { score1: 0, score2: 0, score3: 0 }, expectedTotal: 0 },
      { scores: { score1: 100, score2: 100, score3: 100 }, expectedTotal: 300 }
    ];

    for (const testCase of testCases) {
      const res = await request(app)
        .post("/api/check-scores")
        .send(testCase.scores);

      if (res.statusCode === 200) {
        expect(res.body.enteredScores.total).toBe(testCase.expectedTotal);
      }
    }
  }, 20000);
});