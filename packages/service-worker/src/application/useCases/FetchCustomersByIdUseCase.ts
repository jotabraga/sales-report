import { CustomersGatewayInterface } from "../../ports/gatewayInterface/CustomersGatewayInterface";
import { CustomerDTO } from "../../ports/gatewayInterface/CustomersGatewayInterface";

export class FetchCustomerByIdUseCase {
  constructor(private readonly customersGateway: CustomersGatewayInterface) {}

  async execute(customerId: string): Promise<CustomerDTO> {
    return this.customersGateway.getCustomerById(customerId);
  }
}
