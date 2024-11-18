import {
  SalesGatewayInterface,
  SaleDTO,
} from "../../ports/gatewayInterface/SalesGatewayInterface";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class SalesGateway implements SalesGatewayInterface {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  async getSaleById(id: string): Promise<SaleDTO> {
    return this.httpClient.get<SaleDTO>(`${this.baseUrl}/vendas/${id}`);
  }

  async getAllSales(): Promise<SaleDTO[]> {
    return this.httpClient.get<SaleDTO[]>(`${this.baseUrl}/vendas`);
  }
}
