import {
  CustomersGatewayInterface,
  CustomerDTO,
} from "../../ports/gatewayInterface/CustomersGatewayInterface";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class CustomersGateway implements CustomersGatewayInterface {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;

  constructor(baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  async getCustomerById(id: string): Promise<CustomerDTO> {
    return this.httpClient.get<CustomerDTO>(`${this.baseUrl}/clientes/${id}`);
  }

  async getAllCustomers(): Promise<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>(`${this.baseUrl}/clientes`);
  }
}
