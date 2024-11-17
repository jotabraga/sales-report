import { PublishSellersJob } from "../application/useCases/PublishSellersJob";

export class SellersControllers {
  constructor(private readonly publishSellersJod: PublishSellersJob) {}

  async publish(req: any, res: any): Promise<any> {
    const pubMessage = await this.publishSellersJod.execute();
    return res.status(200).json({ message: pubMessage });
  }
}
