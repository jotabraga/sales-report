export interface SellersGatewayInterface {
  getSellerById(id: string): Promise<SellerDTO>;
  getAllSellers(): Promise<SellerDTO[]>;
}

export interface SellerDTO {
  id: string;
  nome: string;
  telefone: string;
}
