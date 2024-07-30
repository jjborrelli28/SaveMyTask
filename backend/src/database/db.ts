import { Kysely } from "kysely";
import { TodoAppDB } from "../types";
import kyselyInstance from "./kysely-instance";

const db = new Kysely<TodoAppDB>({
  dialect: kyselyInstance,
});

export default db;
