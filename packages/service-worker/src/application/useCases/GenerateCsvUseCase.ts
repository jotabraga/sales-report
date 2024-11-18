import { createObjectCsvWriter } from "csv-writer";

export class GenerateCsvUseCase {
  async execute(vendedorId: string, reportData: any[]) {
    const csvWriter = createObjectCsvWriter({
      path: `./reports/vendedor_${vendedorId}.csv`,
      header: [
        { id: "vendedorId", title: "ID do Vendedor" },
        { id: "produtoId", title: "ID do Produto" },
        { id: "produtoNome", title: "Nome do Produto" },
        { id: "produtoPreco", title: "Preço do Produto" },
        { id: "produtoSku", title: "SKU do Produto" },
        { id: "clienteId", title: "ID do Cliente" },
        { id: "clienteNome", title: "Nome do Cliente" },
        { id: "clienteTelefone", title: "Telefone do Cliente" },
        { id: "clienteEmail", title: "Email do Cliente" },
      ],
    });

    await csvWriter.writeRecords(reportData);
  }
}
