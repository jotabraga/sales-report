import { HttpServer } from "../../src/ports/httpServer/HttpServer";
import { ExpressAdapter } from "../../src/infrastructure/httpServer/ExpressAdapter";
import { SalesReportController } from "../../src/entrypoints/SellersController";
import request from "supertest";
import { SellersGatewayInterface } from "../../src/ports/gatewayInterface/SellersGatewayInterface";
import { SellerPublisherJob } from "../../src/application/jobs/SellerPublisherJob";
import { PublishSellerMessageUseCase } from "../../src/application/useCases/PublishSellerMessageUseCase";
import { BrokerClient } from "../../src/ports/brokerClient/BrokerClient";

describe("Integration tests for /sales-report", () => {
  let httpServer: HttpServer;

  let mockSellersGateway: SellersGatewayInterface;
  let mockBrokerClient: BrokerClient;

  beforeEach(() => {
    mockSellersGateway = {
      async getSellerById(id: string) {
        return { id, nome: "Johnson", telefone: "5511999999999" };
      },
      async getAllSellers() {
        return [
          { id: "1", nome: "Mark", telefone: "5511987654321" },
          { id: "2", nome: "Peter", telefone: "5511234567890" },
        ];
      },
    };

    mockBrokerClient = {
      async publish(topic: string, message: any) {
        console.log(`Message published to topic ${topic}`, message);
      },
      async subscribe(topic: string, handler: (message: string) => {}) {},
    };

    httpServer = new ExpressAdapter();

    const publishSellerMessageUseCase = new PublishSellerMessageUseCase(
      mockBrokerClient
    );

    const sellerPublisherJob = new SellerPublisherJob(
      mockSellersGateway,
      publishSellerMessageUseCase
    );

    const salesReportController = new SalesReportController(sellerPublisherJob);

    httpServer.register("get", "/health", async () => {
      return { statusCode: 200, body: { status: "UP" } };
    });

    httpServer.register("get", "/sales-report", async () => {
      return salesReportController.publish();
    });
  });

  it("Should return a state of UP for the /health endpoint", async () => {
    const response = await request((httpServer as ExpressAdapter).app).get(
      "/health"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });

  it("Should return success when sales report is published", async () => {
    const brokerSpy = jest.spyOn(mockBrokerClient, "publish");

    const response = await request((httpServer as ExpressAdapter).app).get(
      "/sales-report"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Message published successfully",
    });

    expect(brokerSpy).toHaveBeenCalledTimes(2);
    expect(brokerSpy).toHaveBeenCalledWith("sellers-topic", {
      id: "1",
      nome: "Mark",
      telefone: "5511987654321",
    });
    expect(brokerSpy).toHaveBeenCalledWith("sellers-topic", {
      id: "2",
      nome: "Peter",
      telefone: "5511234567890",
    });
  });

  it("Should return error if gateway fails", async () => {
    jest
      .spyOn(mockSellersGateway, "getAllSellers")
      .mockRejectedValue(new Error("Failed to fetch sellers"));

    const response = await request((httpServer as ExpressAdapter).app).get(
      "/sales-report"
    );

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "There is an error in seller message publish",
    });
  });

  it("Should return error if broker client fails", async () => {
    jest
      .spyOn(mockBrokerClient, "publish")
      .mockRejectedValue(new Error("Failed to publish message"));

    const response = await request((httpServer as ExpressAdapter).app).get(
      "/sales-report"
    );

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "There is an error in seller message publish",
    });
  });
});
