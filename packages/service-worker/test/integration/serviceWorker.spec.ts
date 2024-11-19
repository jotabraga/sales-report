import { HttpServer } from "../../src/ports/httpServer/HttpServer";
import { ExpressAdapter } from "../../src/infrastructure/httpServer/ExpressAdapter";
import request from "supertest";

describe("Integration tests for /sales-report", () => {
  let httpServer: HttpServer;

  beforeEach(() => {
    httpServer = new ExpressAdapter();

    httpServer.register("get", "/health", async () => {
      return { statusCode: 200, body: { status: "UP" } };
    });
  });

  it("Should return a state of UP for the /health endpoint", async () => {
    const response = await request((httpServer as ExpressAdapter).app).get(
      "/health"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });
});
