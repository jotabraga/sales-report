import { configureServer } from "./config/serverConfig";

const { httpServer } = configureServer();

export default httpServer;
