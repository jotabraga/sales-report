import { ExpressAdapter } from "../infrastructure/httpServer/ExpressAdapter";
import { RabbitMQClient } from "../infrastructure/brokerClient/RabbitMQClient";
import { config } from "./env";

interface ServerConfig {
  httpServer: ExpressAdapter;
}

export function configureServer(): ServerConfig {
  const rabbitMqUrl = config.rabbitMqUrl;

  const brokerClient = new RabbitMQClient(rabbitMqUrl);

  const httpServer = new ExpressAdapter();

  return { httpServer };
}
