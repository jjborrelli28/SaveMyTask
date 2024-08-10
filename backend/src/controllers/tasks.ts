import { Request, Response } from "express";
import db from "../database/db";
import { Task } from "../types";
import { broadcast } from "../web-socket";

export const getTaskList = async (req: Request, res: Response) => {
  const search = req.query?.search as string | undefined;

  try {
    let taskList = await db.selectFrom("task").selectAll().execute();

    if (search !== undefined) {
      taskList = taskList.filter((task) =>
        task.description.toLowerCase().includes(search.toLowerCase())
      );
      broadcast({ type: "TASK_LIST_UPDATE", taskList });
    }

    res.json(taskList);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error trying to get the task list", description: error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const task = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error trying to get the task", description: error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { description, state, user_id } = req.body as Task;

  if (!description || !state || !user_id) {
    return res
      .status(400)
      .json({ error: "Description, state, and user_id are required" });
  }

  try {
    const result = await db
      .insertInto("task")
      .values({
        description,
        state,
        user_id,
      })
      .executeTakeFirstOrThrow();

    const taskList = await db.selectFrom("task").selectAll().execute();
    broadcast({ type: "TASK_LIST_UPDATE", taskList });

    const newTask = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();

    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create task", description: error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const { description, state } = req.body;

  if (!description && !state) {
    return res.status(400).json({ error: "Description or state are required" });
  }

  try {
    const result = await db
      .updateTable("task")
      .set({
        description,
        state,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .execute();

    if (result[0].numUpdatedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const taskList = await db.selectFrom("task").selectAll().execute();
    broadcast({ type: "TASK_LIST_UPDATE", taskList });

    const updatedTask = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error: "Error while trying to update the task",
      description: error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const result = await db
      .deleteFrom("task")
      .where("id", "=", taskId)
      .execute();

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const taskList = await db.selectFrom("task").selectAll().execute();
    broadcast({ type: "TASK_LIST_UPDATE", taskList });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error while trying to delete the task",
      description: error,
    });
  }
};
