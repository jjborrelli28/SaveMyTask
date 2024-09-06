import { showByConsole } from "../../helpers/show-by-console";
import { TaskTable } from "../../types";
import db from "../database";

const createMultipleTasks = async (count: number) => {
  const numberOfTasks = Array(count)
    .fill(null)
    .map((_, n) => ({
      title: `Task ${n + 1}`,
      state: "To do" as TaskTable["state"],
      user_id: 12,
    }));

  return await db.insertInto("task").values(numberOfTasks).execute();
};

const createTasksAndExit = async (count: number) => {
  try {
    await createMultipleTasks(count);
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

const count = parseInt(process.argv[2], 10);

if (!isNaN(count) && count > 0) {
  createTasksAndExit(count);
} else {
  console.error("Please provide a valid number of tasks to create.");
  process.exit(1);
}
