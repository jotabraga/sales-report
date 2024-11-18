export class Product {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly tipo: string,
    public readonly preco: string,
    public readonly sku: string,
    public readonly vendedorId: string
  ) {}
}
