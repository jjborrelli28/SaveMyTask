import { Request, Response } from "express";
import db from "../database/db";
import { Task } from "../types";
import { broadcast } from "../web-socket";

const getUpdatedTaskList = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const offset = (page - 1) * limit;

  const list = await db
    .selectFrom("task")
    .selectAll()
    .where("description", "like", `%${search}%`)
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc")
    .execute();
  return { list, total: list.length + 1 };
};

export const getTaskList = async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "20",
    search = "",
  } = req.query as { page: string; limit: string; search: string };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    return res.status(400).json({ error: "Invalid page number" });
  }
  if (isNaN(limitNumber) || limitNumber <= 0) {
    return res.status(400).json({ error: "Invalid limit number" });
  }

  try {
    const { list, total } = await getUpdatedTaskList({
      search,
      page: pageNumber,
      limit: limitNumber,
    });

    res.json({ list, total, page: pageNumber, limit: limitNumber });
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
  const {
    page = "1",
    limit = "20",
    search = "",
  } = req.query as { page: string; limit: string; search: string };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

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

    const { list } = await getUpdatedTaskList({
      search,
      page: pageNumber,
      limit: limitNumber,
    });

    broadcast({ type: "UPDATE_TASK_LIST", list });

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
  const {
    page = "1",
    limit = "20",
    search = "",
  } = req.query as { page: string; limit: string; search: string };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

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

    const { list } = await getUpdatedTaskList({
      search,
      page: pageNumber,
      limit: limitNumber,
    });

    broadcast({ type: "UPDATE_TASK_LIST", list });

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
  const {
    page = "1",
    limit = "20",
    search = "",
  } = req.query as { page: string; limit: string; search: string };
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

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

    const { list } = await getUpdatedTaskList({
      search,
      page: pageNumber,
      limit: limitNumber,
    });

    broadcast({ type: "UPDATE_TASK_LIST", list });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error while trying to delete the task",
      description: error,
    });
  }
};
