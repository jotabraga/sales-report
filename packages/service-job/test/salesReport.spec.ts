import request from "supertest";
import app from "../src/server";

describe("Sales report endpoint", () => {
  it("Should return a message for a get in the sales report endopoint", async () => {
    const response = await request(app).get("/sales-report/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message:
        "This use case should publish to message queue a job to a specific seller",
    });
  });
});
