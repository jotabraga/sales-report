import { ISellerRepository } from "../../ports/ISellerRepository";
import { IMessagePublisher } from "../../ports/IMessagePublisher";

export class PublishSellersJob {
  constructor() {}

  async execute(): Promise<string> {
    return "This use case should publish to message queue";
  }
}
