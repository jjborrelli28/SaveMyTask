import { Kysely } from "kysely";
import { SaveMyTaskDatabase } from "../types";
import kyselyInstance from "./kysely-instance";

const db = new Kysely<SaveMyTaskDatabase>({
  dialect: kyselyInstance,
});

export default db;
