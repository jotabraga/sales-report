import request from "supertest";
import app from "../src/server";

describe("Health check endpoint", () => {
  it("Should return a state of UP for a healthy server", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual("UP");
  });
});
