import { PublishSellerMessageUseCase } from "../useCases/PublishSellerMessageUseCase";
import { HttpClient } from "../../ports/httpClient/HttpClient";
import { Seller } from "../../domain/Seller";

export class SellerPublisherJob {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly publishSellerMessageUseCase: PublishSellerMessageUseCase,
    private readonly sellersApiBaseUrl: string
  ) {}

  async execute(): Promise<void> {
    const sellers = await this.httpClient.get<Seller[]>(this.sellersApiBaseUrl);

    for (const seller of sellers) {
      console.log("here", seller);
      await this.publishSellerMessageUseCase.execute(seller);
    }
  }
}
