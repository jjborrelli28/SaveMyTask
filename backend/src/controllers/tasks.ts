import { Request, Response } from "express";
import db from "../database/db";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await db.selectFrom("task").selectAll().execute();

    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: "Error trying to get the all tasks" });
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
    res.status(500).json({ error: "Error trying to get the task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { description, state, user_id } = req.body;

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

    const task = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const editTask = async (req: Request, res: Response) => {
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

    const updatedTask = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error while trying to update the task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const result = await db.deleteFrom("task").where("id", "=", id).execute();

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while trying to delete the task" });
  }
};
