import app from "./server";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
}

bootstrap();
