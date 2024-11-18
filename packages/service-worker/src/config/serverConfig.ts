import { ExpressAdapter } from "../infrastructure/httpServer/ExpressAdapter";
import { RabbitMQClient } from "../infrastructure/brokerClient/RabbitMQClient";
import { config } from "./env";
import { registerHealthRoute } from "../routes/healthRoute";

interface ServerConfig {
  httpServer: ExpressAdapter;
}

export function configureServer(): ServerConfig {
  const rabbitMqUrl = config.rabbitMqUrl;

  const brokerClient = new RabbitMQClient(rabbitMqUrl);

  const httpServer = new ExpressAdapter();

  registerHealthRoute(httpServer);

  return { httpServer };
}
