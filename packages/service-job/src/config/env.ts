import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  rabbitMqUrl: process.env.RABBITMQ_URL || "",
  sellersApiBaseUrl: process.env.SELLERS_API_BASE_URL || "",
};

if (!config.rabbitMqUrl || !config.sellersApiBaseUrl) {
  throw new Error("Missing required environment variables");
}
