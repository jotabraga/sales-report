import { ExpressAdapter } from "./infrastructure/httpServer/ExpressAdapter";
import { SalesReportController } from "./entrypoints/SellersController";
import { PublishSalesReportJob } from "./application/useCases/PublishSalesReport";

const httpServer = new ExpressAdapter();

const publishSalesReportJob = new PublishSalesReportJob();
const sellersController = new SalesReportController(publishSalesReportJob);

httpServer.register("get", "/health", async () => {
  return { statusCode: 200, body: { status: "UP" } };
});

httpServer.register("get", "/sales-report/:id", async (params, _body) => {
  const { id } = params;
  return sellersController.publish(id);
});

export default httpServer;
