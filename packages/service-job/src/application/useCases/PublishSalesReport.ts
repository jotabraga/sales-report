import { ISellerRepository } from "../../ports/ISellerRepository";
import { IMessagePublisher } from "../../ports/IMessagePublisher";

export class PublishSalesReportJob {
  constructor() {}

  async execute(): Promise<{ statusCode: number; body: string }> {
    const message =
      "This use case should publish to message queue a job to a specific seller";
    return { statusCode: 200, body: message };
  }
}
