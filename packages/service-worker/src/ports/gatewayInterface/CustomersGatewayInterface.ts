export interface CustomersGatewayInterface {
  getCustomerById(id: string): Promise<CustomerDTO>;
  getAllCustomers(): Promise<CustomerDTO[]>;
}

export interface CustomerDTO {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}
