import { SalesGatewayInterface } from "../../ports/gatewayInterface/SalesGatewayInterface";

export class FetchSalesBySellerIdUseCase {
  constructor(private readonly salesGateway: SalesGatewayInterface) {}

  async execute(sellerId: string) {
    return this.salesGateway.getSaleBySellerId(sellerId);
  }
}
