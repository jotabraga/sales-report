import { CustomersGateway } from "../../infrastructure/gateways/CustomersGateway";
import { CustomerDTO } from "../../ports/gatewayInterface/CustomersGatewayInterface";

export class FetchCustomerByIdUseCase {
  constructor(private readonly customersGateway: CustomersGateway) {}

  async execute(customerId: string): Promise<CustomerDTO> {
    return this.customersGateway.getCustomerById(customerId);
  }
}
