import { FetchSalesBySellerIdUseCase } from "./FetchSalesBySellerIdUseCase";
import { FetchProductsBySellerIdUseCase } from "./FetchProductsBySellerIdUseCase";
import { FetchCustomerByIdUseCase } from "./FetchCustomersByIdUseCase";
import { SellerDTO } from "../../ports/gatewayInterface/SellersGatewayInterface";

export class ConsolidateSaleReportDataUseCase {
  constructor(
    private readonly fetchSalesBySellerIdUseCase: FetchSalesBySellerIdUseCase,
    private readonly fetchProductsBySellerIdUseCase: FetchProductsBySellerIdUseCase,
    private readonly fetchCustomerByIdUseCase: FetchCustomerByIdUseCase
  ) {}

  async execute(seller: SellerDTO) {
    const [sales, products] = await Promise.all([
      this.fetchSalesBySellerIdUseCase.execute(seller.id),
      this.fetchProductsBySellerIdUseCase.execute(seller.id),
    ]);

    const customerIds = [...new Set(sales.map((sale) => sale.cliente_id))];
    const customers = await Promise.all(
      customerIds.map((id) => this.fetchCustomerByIdUseCase.execute(id))
    );

    return sales.map((sale) => {
      const product = products.find((p) => p.id === sale.produto_id);
      const customer = customers.find((c) => c.id === sale.cliente_id);

      return {
        sellerId: seller.id,
        SellerName: seller.nome,
        customerId: customer?.id,
        customerName: customer?.nome,
        customerPhone: customer?.telefone,
        customerEmail: customer?.email,
        productId: product?.id,
        productName: product?.nome,
        productPrice: product?.preco,
        productSku: product?.sku,
      };
    });
  }
}
