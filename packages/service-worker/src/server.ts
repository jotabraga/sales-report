import { ExpressAdapter } from "./infrastructure/httpServer/ExpressAdapter";
import { configureServer } from "./config/serverConfig";

export default async function initializeServer() {
  const { httpServer } = await configureServer();
  return httpServer as ExpressAdapter;
}
