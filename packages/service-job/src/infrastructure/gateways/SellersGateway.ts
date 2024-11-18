import {
  SellersGatewayInterface,
  SellerDTO,
} from "../../ports/gatewayInterface/SellersGatewayInterface";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class SellersGateway implements SellersGatewayInterface {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  async getSellerById(id: string): Promise<SellerDTO> {
    return this.httpClient.get<SellerDTO>(`${this.baseUrl}/sellers/${id}`);
  }

  async getAllSellers(): Promise<SellerDTO[]> {
    return this.httpClient.get<SellerDTO[]>(`${this.baseUrl}/sellers`);
  }
}
