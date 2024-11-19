import { ConsolidateSaleReportDataUseCase } from "../../src/application/useCases/ConsolidateSaleReportDataUseCase";

import {
  validSales,
  validProducts,
  validCustomerA,
  validCustomerB,
} from "../mocks/useCases";

describe("ConsolidateSaleReportDataUseCase test suite", () => {
  it("should consolidate sales, products, and customers for valid data", async () => {
    const fetchSalesBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validSales),
    };
    const fetchProductsBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validProducts),
    };
    const fetchCustomerByIdUseCase = {
      execute: jest
        .fn()
        .mockResolvedValueOnce(validCustomerA)
        .mockResolvedValueOnce(validCustomerB),
    };
    const useCase = new ConsolidateSaleReportDataUseCase(
      fetchSalesBySellerIdUseCase as any,
      fetchProductsBySellerIdUseCase as any,
      fetchCustomerByIdUseCase as any
    );

    const result = await useCase.execute({
      id: "1",
      nome: "John",
      telefone: "55 12987546235",
    });

    expect(result).toEqual([
      {
        sellerId: "1",
        SellerName: "John",
        customerId: "1",
        customerName: "Sara",
        customerPhone: "123456",
        customerEmail: "sara@example.com",
        productId: "101",
        productName: "Tire dunlop",
        productPrice: 100,
        productSku: "PA100",
      },
      {
        sellerId: "1",
        SellerName: "John",
        customerId: "2",
        customerName: "Paul",
        customerPhone: "654321",
        customerEmail: "paul@example.com",
        productId: "102",
        productName: "Desk table",
        productPrice: 200,
        productSku: "PB200",
      },
    ]);
  });

  it("should return an empty list for a no-sales seller", async () => {
    const fetchSalesBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue([]),
    };
    const fetchProductsBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validProducts),
    };
    const fetchCustomerByIdUseCase = {
      execute: jest
        .fn()
        .mockResolvedValueOnce(validCustomerA)
        .mockResolvedValueOnce(validCustomerB),
    };
    const useCase = new ConsolidateSaleReportDataUseCase(
      fetchSalesBySellerIdUseCase as any,
      fetchProductsBySellerIdUseCase as any,
      fetchCustomerByIdUseCase as any
    );

    const result = await useCase.execute({
      id: "1",
      nome: "John",
      telefone: "55 12987546235",
    });

    expect(result).toEqual([]);
  });

  it("should return an report without product data for not listed products", async () => {
    const fetchSalesBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validSales),
    };
    const fetchProductsBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue([]),
    };
    const fetchCustomerByIdUseCase = {
      execute: jest
        .fn()
        .mockResolvedValueOnce(validCustomerA)
        .mockResolvedValueOnce(validCustomerB),
    };
    const useCase = new ConsolidateSaleReportDataUseCase(
      fetchSalesBySellerIdUseCase as any,
      fetchProductsBySellerIdUseCase as any,
      fetchCustomerByIdUseCase as any
    );

    const result = await useCase.execute({
      id: "1",
      nome: "John",
      telefone: "55 12987546235",
    });

    expect(result).toEqual([
      {
        sellerId: "1",
        SellerName: "John",
        customerId: "1",
        customerName: "Sara",
        customerPhone: "123456",
        customerEmail: "sara@example.com",
        productId: undefined,
        productName: undefined,
        productPrice: undefined,
        productSku: undefined,
      },
      {
        sellerId: "1",
        SellerName: "John",
        customerId: "2",
        customerName: "Paul",
        customerPhone: "654321",
        customerEmail: "paul@example.com",
        productId: undefined,
        productName: undefined,
        productPrice: undefined,
        productSku: undefined,
      },
    ]);
  });

  it("should return an report without customer data for not listed customers", async () => {
    const fetchSalesBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validSales),
    };
    const fetchProductsBySellerIdUseCase = {
      execute: jest.fn().mockResolvedValue(validProducts),
    };
    const fetchCustomerByIdUseCase = {
      execute: jest.fn().mockResolvedValueOnce({}).mockResolvedValueOnce({}),
    };
    const useCase = new ConsolidateSaleReportDataUseCase(
      fetchSalesBySellerIdUseCase as any,
      fetchProductsBySellerIdUseCase as any,
      fetchCustomerByIdUseCase as any
    );

    const result = await useCase.execute({
      id: "1",
      nome: "John",
      telefone: "55 12987546235",
    });

    expect(result).toEqual([
      {
        sellerId: "1",
        SellerName: "John",
        customerId: undefined,
        customerName: undefined,
        customerPhone: undefined,
        customerEmail: undefined,
        productId: "101",
        productName: "Tire dunlop",
        productPrice: 100,
        productSku: "PA100",
      },
      {
        sellerId: "1",
        SellerName: "John",
        customerId: undefined,
        customerName: undefined,
        customerPhone: undefined,
        customerEmail: undefined,
        productId: "102",
        productName: "Desk table",
        productPrice: 200,
        productSku: "PB200",
      },
    ]);
  });
});
