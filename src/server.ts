import "dotenv/config";
import { createServer } from "http";
import App from "./App";
import Db from "./config/Db";
import { env } from "./config/validate";

const port = env.PORT;
const expressApp = App.app;

const httpServer = createServer(expressApp);
const startServer = async () => {
  await Db.connectMongo();
  httpServer.listen(port, () => console.log(`Server started on port ${port}`));
};

startServer();
