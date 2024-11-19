import { createObjectCsvWriter } from "csv-writer";
import fs from "fs/promises";
import { logger } from "../../infrastructure/utils/Logger";

export class GenerateCsvUseCase {
  async execute(vendedorId: string, reportData: any[]) {
    const reportsPath = "./reports";

    try {
      await fs.mkdir(reportsPath, { recursive: true });

      const csvWriter = createObjectCsvWriter({
        path: `${reportsPath}/vendedor_${vendedorId}.csv`,
        header: [
          { id: "sellerId", title: "ID do Vendedor" },
          { id: "SellerName", title: "Nome do Vendedor" },
          { id: "customerId", title: "ID do Cliente" },
          { id: "customerName", title: "Nome do Cliente" },
          { id: "customerPhone", title: "Telefone do Cliente" },
          { id: "customerEmail", title: "Email do Cliente" },
          { id: "productId", title: "ID do Produto" },
          { id: "productName", title: "Nome do Produto" },
          { id: "productPrice", title: "Preço do Produto" },
          { id: "productSku", title: "SKU do Produto" },
        ],
      });

      // Escrever os registros no arquivo CSV
      await csvWriter.writeRecords(reportData);
      logger.info(
        `CSV file generated: ${reportsPath}/vendedor_${vendedorId}.csv`
      );
    } catch (error: any) {
      logger.error(
        `There is an error in generate file to seller: ${vendedorId} [Error]: ${error.message}`
      );
      throw error;
    }
  }
}
