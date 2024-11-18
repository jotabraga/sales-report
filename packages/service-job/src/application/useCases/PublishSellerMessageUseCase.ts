import { BrokerClient } from "../../ports/brokerClient/BrokerClient";
import { Seller } from "../../domain/Seller";

export class PublishSellerMessageUseCase {
  constructor(private readonly brokerClient: BrokerClient) {}

  async execute(seller: Seller): Promise<void> {
    await this.brokerClient.publish("sellers-topic", {
      id: seller.id,
      nome: seller.nome,
      telefone: seller.telefone,
    });
  }
}
