import { SellerPublisherJob } from "../application/jobs/SellerPublisherJob";

export class SalesReportController {
  constructor(private readonly sellerPublisherJob: SellerPublisherJob) {}

  async publish(): Promise<any> {
    try {
      await this.sellerPublisherJob.execute();
      return {
        statusCode: 200,
        body: { message: "Message published successfully" },
      };
    } catch (error: any) {
      console.log(`There is an error in publish seller message ${error.stack}`);
      return {
        statusCode: 500,
        body: { message: "There is an error in seller message publish" },
      };
    }
  }
}
