import { ExpressAdapter } from "../infrastructure/httpServer/ExpressAdapter";
import { ConsumeBrokerJob } from "../application/jobs/ConsumeBrokerJob";
import { AxiosAdapter } from "../infrastructure/httpClient/AxiosAdapter";
import { RabbitMQClient } from "../infrastructure/brokerClient/RabbitMQClient";
import { SalesGateway } from "../infrastructure/gateways/SalesGateway";
import { ProductsGateway } from "../infrastructure/gateways/ProductsGateway";
import { CustomersGateway } from "../infrastructure/gateways/CustomersGateway";
import { FetchSalesBySellerIdUseCase } from "../application/useCases/FetchSalesBySellerIdUseCase";
import { FetchProductsBySellerIdUseCase } from "../application/useCases/FetchProductsBySellerIdUseCase";
import { FetchCustomerByIdUseCase } from "../application/useCases/FetchCustomersByIdUseCase";
import { ConsolidateSaleReportDataUseCase } from "../application/useCases/ConsolidateSaleReportDataUseCase";
import { registerHealthRoute } from "../routes/healthRoute";
import { config } from "./env";
import { GenerateCsvUseCase } from "../application/useCases/GenerateCsvUseCase";
import { logger } from "../infrastructure/utils/Logger";

interface ServerConfig {
  httpServer: ExpressAdapter;
  consumeBrokerJob: ConsumeBrokerJob;
}

export async function configureServer(): Promise<ServerConfig> {
  const rabbitMqUrl = config.rabbitMqUrl;
  const apiBaseUrl = config.apiBaseUrl;

  const httpClient = new AxiosAdapter();
  const brokerClient = new RabbitMQClient(rabbitMqUrl);
  try {
    await brokerClient.connect();
    logger.info("RabbitMQ connected successfully.");
  } catch (error: any) {
    logger.error("Failed to connect to RabbitMQ:", error.message);
    process.exit(1);
  }
  const salesGateway = new SalesGateway(apiBaseUrl, httpClient);
  const productsGateway = new ProductsGateway(apiBaseUrl, httpClient);
  const customersGateway = new CustomersGateway(apiBaseUrl, httpClient);
  const fetchSalesBySellerIdUseCase = new FetchSalesBySellerIdUseCase(
    salesGateway
  );
  const fetchProductsBySellerIdUseCase = new FetchProductsBySellerIdUseCase(
    productsGateway
  );
  const fetchCustomerByIdUseCase = new FetchCustomerByIdUseCase(
    customersGateway
  );

  const consolidateSaleReportDataUseCase = new ConsolidateSaleReportDataUseCase(
    fetchSalesBySellerIdUseCase,
    fetchProductsBySellerIdUseCase,
    fetchCustomerByIdUseCase
  );

  const generateCsvUseCase = new GenerateCsvUseCase();

  const consumeBrokerJob = new ConsumeBrokerJob(
    brokerClient,
    consolidateSaleReportDataUseCase,
    generateCsvUseCase
  );

  const httpServer = new ExpressAdapter();
  registerHealthRoute(httpServer);

  consumeBrokerJob.execute("sellers-topic").catch((error) => {
    logger.error(`Failed to start ConsumeBrokerJob: ${error.message}`);
  });

  return { httpServer, consumeBrokerJob };
}
