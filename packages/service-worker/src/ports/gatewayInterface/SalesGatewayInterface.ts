export interface SalesGatewayInterface {
  getSaleBySellerId(id: string): Promise<SaleDTO[]>;
  getAllSales(): Promise<SaleDTO[]>;
}

export interface SaleDTO {
  id: string;
  vendedor_id: string;
  produto_id: string;
  cliente_id: string;
}
