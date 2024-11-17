import {
  SellersGatewayInterface,
  Seller,
} from "../../ports/outbound/SellersGatewayInterface";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class SellersGateway implements SellersGatewayInterface {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  async getSellerById(id: string): Promise<Seller> {
    return this.httpClient.get<Seller>(`${this.baseUrl}/sellers/${id}`);
  }

  async getAllSellers(): Promise<Seller[]> {
    return this.httpClient.get<Seller[]>(`${this.baseUrl}/sellers`);
  }
}
