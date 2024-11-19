import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  rabbitMqUrl: process.env.RABBITMQ_URL || "",
  apiBaseUrl: process.env.API_BASE_URL || "",
};
