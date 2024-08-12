import db from "../db";

async function deleteAllTasks() {
  await db.deleteFrom("task").execute();
}

const deleteTasks = async () => {
  try {
    await deleteAllTasks();
    if (process.env.NODE_ENV === "development") {
      console.log("All tasks deleted successfully.");
    }
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error(error);
    await db.destroy();
    process.exit(1);
  }
};

deleteTasks();
