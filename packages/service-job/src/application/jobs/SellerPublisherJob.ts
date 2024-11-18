import { PublishSellerMessageUseCase } from "../useCases/PublishSellerMessageUseCase";
import { HttpClient } from "../../ports/httpClient/HttpClient";
import { SellerDTO } from "../../ports/gatewayInterface/SellersGatewayInterface";

export class SellerPublisherJob {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly publishSellerMessageUseCase: PublishSellerMessageUseCase,
    private readonly sellersApiBaseUrl: string
  ) {}

  async execute(): Promise<void> {
    const sellers = await this.httpClient.get<SellerDTO[]>(
      this.sellersApiBaseUrl
    );

    for (const seller of sellers) {
      await this.publishSellerMessageUseCase.execute(seller);
    }
  }
}
