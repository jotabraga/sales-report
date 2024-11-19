import { BrokerClient } from "../../ports/brokerClient/BrokerClient";
import { GenerateCsvUseCase } from "../useCases/GenerateCsvUseCase";
import { SellerDTO } from "../../ports/gatewayInterface/SellersGatewayInterface";
import { logger } from "../../infrastructure/utils/Logger";
import { ConsolidateSaleReportDataUseCase } from "../useCases/ConsolidateSaleReportDataUseCase";

export class ConsumeBrokerJob {
  constructor(
    private readonly brokerClient: BrokerClient,
    private readonly consolidateSaleReportDataUseCase: ConsolidateSaleReportDataUseCase,
    private readonly generateCsvUseCase: GenerateCsvUseCase
  ) {}

  async execute(topic: string): Promise<void> {
    logger.info(`Subscribing to topic: ${topic}`);

    await this.brokerClient.subscribe(topic, async (message: any) => {
      try {
        const seller: SellerDTO = message;
        logger.info(`Received message for seller ID: ${seller.id}`);

        const consolidatedData =
          await this.consolidateSaleReportDataUseCase.execute(seller);

        await this.generateCsvUseCase.execute(seller.id, consolidatedData);

        logger.info(
          `Successfully generated report for seller ID: ${seller.id}`
        );
      } catch (error: any) {
        logger.error(`Error processing message: ${error.message}`);
      }
    });

    logger.info(`Subscribed to topic: ${topic} and awaiting messages.`);
  }
}
