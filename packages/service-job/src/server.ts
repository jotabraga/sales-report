import express from "express";
import { SellersControllers } from "./entrypoints/SellersController";
import { PublishSellersJob } from "./application/useCases/PublishSellersJob";

const app = express();

app.use(express.json());
const publishSelletsJob = new PublishSellersJob();
const sellersController = new SellersControllers(publishSelletsJob);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/sales-report", (req, res) => sellersController.publish(req, res));

export default app;
