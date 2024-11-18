import { SellerPublisherJob } from "../application/jobs/SellerPublisherJob";

export class SalesReportController {
  constructor(private readonly sellerPublisherJob: SellerPublisherJob) {}

  async publish(): Promise<any> {
    const response = await this.sellerPublisherJob.execute();
    return response;
  }
}
