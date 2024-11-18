export interface ProductsGatewayInterface {
  getProductById(id: string): Promise<ProductDTO>;
  getAllProducts(): Promise<ProductDTO[]>;
}

export interface ProductDTO {
  id: string;
  nome: string;
  tipo: string;
  preco: string;
  sku: string;
  vendedor_id: string;
}
