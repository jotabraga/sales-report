import { ProductsGatewayInterface } from "../../ports/gatewayInterface/ProductsGatewayInterface";
import { ProductDTO } from "../../ports/gatewayInterface/ProductsGatewayInterface";

export class FetchProductsBySellerIdUseCase {
  constructor(private readonly productsGateway: ProductsGatewayInterface) {}

  async execute(sellerId: string): Promise<ProductDTO[]> {
    return this.productsGateway.getProductsBySellerId(sellerId);
  }
}
