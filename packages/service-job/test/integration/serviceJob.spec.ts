import { HttpServer } from "../../src/ports/httpServer/HttpServer";
import { ExpressAdapter } from "../../src/infrastructure/httpServer/ExpressAdapter";
import { SalesReportController } from "../../src/entrypoints/SellersController";
import request from "supertest";
import {
  Seller,
  SellersGatewayInterface,
} from "../../src/ports/outbound/SellersGatewayInterface";

describe("Integration tests", () => {
  let httpServer: HttpServer;
  let sellersGateway: SellersGatewayInterface = {
    async getSellerById(id: string): Promise<Seller> {
      return {
        id: id,
        nome: "Guadalupe Halvorson",
        telefone: "303-894-5825",
      };
    },
    async getAllSellers(): Promise<Seller[]> {
      return [
        {
          id: "1",
          nome: "Guadalupe Halvorson",
          telefone: "303-894-5825",
        },
      ];
    },
  };

  beforeEach(() => {
    httpServer = new ExpressAdapter();

    const publishSalesReportJob = new PublishSalesReportJob(sellersGateway);
    const sellersController = new SalesReportController(publishSalesReportJob);

    httpServer.register("get", "/health", async () => {
      return { statusCode: 200, body: { status: "UP" } };
    });

    httpServer.register(
      "get",
      "/sales-report/:id",
      async (params: { id: string }) => {
        const { id } = params;
        return sellersController.publish(id);
      }
    );
  });

  it("Should return a state of UP for the /health endpoint", async () => {
    const response = await request((httpServer as ExpressAdapter).app).get(
      "/health"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });

  it("Should return a sales report for a given ID", async () => {
    jest
      .spyOn(PublishSalesReportJob.prototype, "execute")
      .mockResolvedValue({ statusCode: 200, body: "teste" });

    const response = await request((httpServer as ExpressAdapter).app).get(
      "/sales-report/1"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("teste");
  });
});
