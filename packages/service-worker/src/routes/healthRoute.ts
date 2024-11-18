import { HttpServer } from "../ports/httpServer/HttpServer";

export const registerHealthRoute = (httpServer: HttpServer) => {
  httpServer.register("get", "/health", async () => {
    return { statusCode: 200, body: { status: "UP" } };
  });
};
