import { PublishSalesReportJob } from "../application/useCases/PublishSalesReport";

export class SalesReportController {
  constructor(private readonly publishSalesReportJob: PublishSalesReportJob) {}

  async publish(id: number): Promise<any> {
    const response = await this.publishSalesReportJob.execute();
    return response;
  }
}
