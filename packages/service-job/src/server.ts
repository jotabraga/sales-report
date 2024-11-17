import express from "express";
import { SalesReportController } from "./entrypoints/SellersController";
import { PublishSalesReportJob } from "./application/useCases/PublishSalesReport";

const app = express();

app.use(express.json());
const publishSalesReportJob = new PublishSalesReportJob();
const sellersController = new SalesReportController(publishSalesReportJob);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/sales-report/:id", (req, res) => {
  {
    const { id } = req.params;
    sellersController.publish(req, res);
  }
});

export default app;
