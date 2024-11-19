import { ExpressAdapter } from "../infrastructure/httpServer/ExpressAdapter";
import { SalesReportController } from "../entrypoints/SellersController";
import { SellerPublisherJob } from "../application/jobs/SellerPublisherJob";
import { AxiosAdapter } from "../infrastructure/httpClient/AxiosAdapter";
import { PublishSellerMessageUseCase } from "../application/useCases/PublishSellerMessageUseCase";
import { RabbitMQClient } from "../infrastructure/brokerClient/RabbitMQClient";
import { registerSaleReportRoutes } from "../routes/salesRoutes";
import { config } from "./env";
import { SellersGateway } from "../infrastructure/gateways/SellersGateway";

interface ServerConfig {
  httpServer: ExpressAdapter;
  sellersController: SalesReportController;
}

export function configureServer(): ServerConfig {
  const rabbitMqUrl = config.rabbitMqUrl;
  const apiBaseUrl = config.apiBaseUrl;
  const httpClient = new AxiosAdapter();
  const brokerClient = new RabbitMQClient(rabbitMqUrl);
  brokerClient
    .connect()
    .then(() => {
      console.log("RabbitMQ connected successfully.");
    })
    .catch((error) => {
      console.error("Failed to connect to RabbitMQ:", error.message);
      process.exit(1);
    });

  const publishSellerMessageUseCase = new PublishSellerMessageUseCase(
    brokerClient
  );

  const sellersGateway = new SellersGateway(apiBaseUrl, httpClient);

  const sellerPublisherJob = new SellerPublisherJob(
    sellersGateway,
    publishSellerMessageUseCase
  );

  const sellersController = new SalesReportController(sellerPublisherJob);

  const httpServer = new ExpressAdapter();

  registerSaleReportRoutes(httpServer, sellersController);

  return { httpServer, sellersController };
}
