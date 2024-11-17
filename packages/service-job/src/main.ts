import httpServer from "./server";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    httpServer.listen(Number(PORT));
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
}

bootstrap();
