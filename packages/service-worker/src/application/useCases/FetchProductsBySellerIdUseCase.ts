import { ProductsGateway } from "../../infrastructure/gateways/ProductsGateway";
import { ProductDTO } from "../../ports/gatewayInterface/ProductsGatewayInterface";

export class FetchProductsBySellerIdUseCase {
  constructor(private readonly productsGateway: ProductsGateway) {}

  async execute(productId: string): Promise<ProductDTO[]> {
    return this.productsGateway.getProductsBySellerId(productId);
  }
}
