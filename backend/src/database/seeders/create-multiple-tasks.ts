import showByConsole from "../../helpers/show-by-console";
import { type TaskTable } from "../../types";
import db from "../database";

const createMultipleTasks = async (userId: number, count: number) => {
  const numberOfTasks = Array(count)
    .fill(null)
    .map((_, n) => ({
      title: `Task ${n + 1}`,
      state: "To do" as TaskTable["state"],
      user_id: userId,
    }));

  return await db.insertInto("task").values(numberOfTasks).execute();
};

const createTasksAndExit = async (userId: number, count: number) => {
  try {
    await createMultipleTasks(userId, count);
    showByConsole(`${count} tasks created successfully.`);
  } catch (error) {
    showByConsole(`Error creating tasks: ${error}`);
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

const userId = parseInt(process.argv[2], 10);
const count = parseInt(process.argv[3], 10);

if (!isNaN(count) && count > 0) {
  createTasksAndExit(userId, count);
} else {
  console.error("Please provide a valid number of tasks to create.");
  process.exit(1);
}
