export interface SellersGatewayInterface {
  getSellerById(id: string): Promise<Seller>;
  getAllSellers(): Promise<Seller[]>;
}

export interface Seller {
  id: string;
  nome: string;
  telefone: string;
}
