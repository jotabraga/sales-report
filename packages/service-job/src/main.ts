import httpServer from "./server";
import dotenv from "dotenv";
import { config } from "./config/env";

const port = config.port;

async function bootstrap() {
  try {
    httpServer.listen(Number(port));
    console.log(`Server is running on port ${port}`);
  } catch (error: any) {
    console.error("Failed to start the application:", error.message);
    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

bootstrap();
