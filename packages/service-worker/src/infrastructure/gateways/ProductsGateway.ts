import {
  ProductsGatewayInterface,
  ProductDTO,
} from "../../ports/gatewayInterface/ProductsGatewayInterface";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class ProductsGateway implements ProductsGatewayInterface {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  async getProductById(id: string): Promise<ProductDTO> {
    return this.httpClient.get<ProductDTO>(`${this.baseUrl}/produtos/${id}`);
  }

  async getAllProducts(): Promise<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>(`${this.baseUrl}/produtos`);
  }
}
