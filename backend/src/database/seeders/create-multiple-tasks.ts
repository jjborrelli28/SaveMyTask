import { TaskTable } from "../../types";
import db from "../db";

async function createMultipleTasks(count: number) {
  const tasks = Array(count)
    .fill(null)
    .map((_, n) => ({
      description: `Task ${n + 1}`,
      state: "To do" as TaskTable["state"],
      user_id: 1,
    }));

  await db.insertInto("task").values(tasks).execute();
}

const count = parseInt(process.argv[2], 10);

if (!isNaN(count) && count > 0) {
  createMultipleTasks(count)
    .then(async () => {
      if (process.env.NODE_ENV === "development")
        console.log(`${count} tasks created successfully.`);
      await db.destroy();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error(error);
      await db.destroy();
      process.exit(1);
    });
} else {
  if (process.env.NODE_ENV === "development")
    console.error("Please provide a valid number of tasks to create.");
  process.exit(1);
}
