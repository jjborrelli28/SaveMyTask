import db from "../database";

const deleteAlltasks = async () => {
  try {
    await db.deleteFrom("task").execute();
    console.log("All tasks deleted successfully.");
  } catch (error) {
    console.error("Error deleting tasks:", error);
  } finally {
    try {
      await db.destroy();
      process.exit(0);
    } catch (destroyError) {
      console.error("Error destroying database connection:", destroyError);
      process.exit(1);
    }
  }
};

deleteAlltasks();
