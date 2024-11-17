import express, { Request, Response, Application } from "express";
import { HttpServer } from "./HttpServer";

export class ExpressAdapter implements HttpServer {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  register(
    method: string,
    url: string,
    callback: (
      params?: any,
      body?: any
    ) => Promise<{ statusCode: number; body: any }>
  ): void {
    const httpMethod = method.toLowerCase();
    if (!["get", "post", "put", "delete", "patch"].includes(httpMethod)) {
      throw new Error(`HTTP method ${method} is not supported`);
    }

    this.app[httpMethod as keyof Application](
      url,
      async (req: Request, res: Response) => {
        try {
          const { statusCode, body } = await callback(req.params, req.body);
          res.status(statusCode).json(body);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
