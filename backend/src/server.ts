import * as dotenv from "dotenv";
import { createServer } from "http";
import app from "./app";
import initializeWebSocket from "./web-socket";

dotenv.config();

const port = process.env.PORT;

const server = createServer(app);
initializeWebSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
