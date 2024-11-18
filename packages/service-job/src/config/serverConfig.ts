import { ExpressAdapter } from "../infrastructure/httpServer/ExpressAdapter";
import { SalesReportController } from "../entrypoints/SellersController";
import { SellerPublisherJob } from "../application/jobs/SellerPublisherJob";
import { AxiosAdapter } from "../infrastructure/httpClient/AxiosAdapter";
import { PublishSellerMessageUseCase } from "../application/useCases/PublishSellerMessageUseCase";
import { RabbitMQClient } from "../infrastructure/brokerClient/RabbitMQClient";
import { registerSaleReportRoutes } from "../routes/salesRoutes";

interface ServerConfig {
  httpServer: ExpressAdapter;
  sellersController: SalesReportController;
}

export function configureServer(): ServerConfig {
  const rabbitMqUrl = process.env.RABBITMQ_URL;
  const sellersApiBaseUrl = process.env.SELLERS_API_BASE_URL;

  if (!rabbitMqUrl || !sellersApiBaseUrl) {
    throw new Error("Missing required environment variables.");
  }

  const httpClient = new AxiosAdapter();
  const brokerClient = new RabbitMQClient(rabbitMqUrl);
  const publishSellerMessageUseCase = new PublishSellerMessageUseCase(
    brokerClient
  );

  const sellerPublisherJob = new SellerPublisherJob(
    httpClient,
    publishSellerMessageUseCase,
    sellersApiBaseUrl
  );

  const sellersController = new SalesReportController(sellerPublisherJob);

  const httpServer = new ExpressAdapter();

  registerSaleReportRoutes(httpServer, sellersController);

  return { httpServer, sellersController };
}
