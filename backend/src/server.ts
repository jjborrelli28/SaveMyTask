import * as dotenv from "dotenv";
import { createServer } from "http";
import app from "./app";

dotenv.config();

const port = process.env.PORT;

const server = createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
