import { SalesReportController } from "../entrypoints/SellersController";
import { HttpServer } from "../ports/httpServer/HttpServer";

export const registerSellerRoutes = (
  httpServer: HttpServer,
  sellersController: SalesReportController
) => {
  httpServer.register("get", "/health", async () => {
    return { statusCode: 200, body: { status: "UP" } };
  });

  httpServer.register("get", "/sales-report", async () => {
    return sellersController.publish();
  });
};
