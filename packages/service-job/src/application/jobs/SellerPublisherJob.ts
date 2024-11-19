import { PublishSellerMessageUseCase } from "../useCases/PublishSellerMessageUseCase";
import { SellersGatewayInterface } from "../../ports/gatewayInterface/SellersGatewayInterface";

export class SellerPublisherJob {
  constructor(
    private readonly sellersGateway: SellersGatewayInterface,
    private readonly publishSellerMessageUseCase: PublishSellerMessageUseCase
  ) {}

  async execute(): Promise<void> {
    const sellers = await this.sellersGateway.getAllSellers();

    for (const seller of sellers) {
      await this.publishSellerMessageUseCase.execute(seller);
    }
  }
}
