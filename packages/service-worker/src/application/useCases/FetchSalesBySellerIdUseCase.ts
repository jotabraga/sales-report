import { SalesGateway } from "../../infrastructure/gateways/SalesGateway";

export class FetchSalesBySellerIdUseCase {
  constructor(private readonly salesGateway: SalesGateway) {}

  async execute(sellerId: string) {
    return this.salesGateway.getSaleBySellerId(sellerId);
  }
}
