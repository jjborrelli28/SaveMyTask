import * as dotenv from "dotenv";
import { createServer } from "http";
import app from "./app";
import { showByConsole } from "./helpers/show-by-console";

dotenv.config();

const port = process.env.PORT;

const server = createServer(app);

server.listen(port, () => {
  showByConsole(`Example app listening on port ${port}`);
});
