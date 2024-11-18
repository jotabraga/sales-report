export class Sale {
  constructor(
    public readonly id: string,
    public readonly vendedorId: string,
    public readonly produtoId: string,
    public readonly clienteId: string
  ) {}
}
