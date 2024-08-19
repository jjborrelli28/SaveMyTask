import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import * as path from "path";
import { showByConsole } from "../../helpers/show-by-console";
import db from "../database";

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "/schemas"),
    }),
  });

  const { results, error } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      showByConsole(
        `Migration "${it.migrationName}" was executed successfully`
      );
    } else if (it.status === "Error") {
      showByConsole(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("Failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
