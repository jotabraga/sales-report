import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  rabbitMqUrl: process.env.RABBITMQ_URL || "",
  customersApiBaseUrl: process.env.CUSTOMERS_API_BASE_URL || "",
  productsApiBaseUrl: process.env.PRODUCTS_API_BASE_URL || "",
  salesApiBaseUrl: process.env.SALES_API_BASE_URL || "",
};

const isMissingMandatoryVars =
  !config.rabbitMqUrl ||
  !config.customersApiBaseUrl ||
  !config.productsApiBaseUrl ||
  !config.salesApiBaseUrl;

if (isMissingMandatoryVars) {
  throw new Error("Missing required environment variables");
}
