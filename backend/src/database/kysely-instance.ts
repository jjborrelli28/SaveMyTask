import * as dotenv from "dotenv";
import { MysqlDialect } from "kysely";
import { createPool } from "mysql2";

dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = Number(process.env.DB_PORT);

const kyselyInstance = new MysqlDialect({
  pool: createPool({
    database: "todo-app",
    host,
    user,
    password,
    port,
    connectionLimit: 10,
  }),
});

export default kyselyInstance;
