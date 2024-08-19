import { showByConsole } from "../../helpers/show-by-console";
import db from "../database";

const deleteAlltasks = async () => {
  try {
    await db.deleteFrom("task").execute();
    showByConsole("All tasks deleted successfully");
  } catch (error) {
    showByConsole(`Error deleting tasks: ${error}`);
  } finally {
    try {
      await db.destroy();
      process.exit(0);
    } catch (destroyError) {
      showByConsole(`Error destroying database connection: ${destroyError}`);
      process.exit(1);
    }
  }
};

deleteAlltasks();
