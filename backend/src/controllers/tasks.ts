import { Request, Response } from "express";
import db from "../database/db";
import { Task } from "../types";
import { broadcast } from "../web-socket";

export async function getUpdatedTaskList({
  search,
  currentPage,
  tasksPerPage,
}: {
  search: string;
  currentPage: number;
  tasksPerPage: number;
}) {
  const list = await db
    .selectFrom("task")
    .selectAll()
    .where("description", "like", `%${search}%`)
    .limit(currentPage * tasksPerPage)
    .orderBy("created_at", "desc")
    .execute();

  const [{ totalCount }] = await db
    .selectFrom("task")
    .select([db.fn.count("id").as("totalCount")])
    .execute();

  const totalPages = Math.ceil(Number(totalCount) / tasksPerPage);

  return { list, totalPages };
}

export const getTaskList = async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "20",
    search = "",
  } = req.query as { page: string; limit: string; search: string };
  const currentPage = parseInt(page, 10);
  const tasksPerPage = parseInt(limit, 10);

  if (isNaN(currentPage) || currentPage <= 0) {
    return res.status(400).json({ error: "Invalid page number" });
  }
  if (isNaN(tasksPerPage) || tasksPerPage <= 0) {
    return res.status(400).json({ error: "Invalid limit number" });
  }

  try {
    const { list, totalPages } = await getUpdatedTaskList({
      search,
      currentPage,
      tasksPerPage,
    });

    const hasNextPage = currentPage < totalPages;

    res.json({
      list,
      currentPage,
      tasksPerPage,
      totalPages,
      hasNextPage,
    });
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
  const currentPage = parseInt(page, 10);
  const tasksPerPage = parseInt(limit, 10);

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
      currentPage,
      tasksPerPage,
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
  const currentPage = parseInt(page, 10);
  const tasksPerPage = parseInt(limit, 10);

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
      currentPage,
      tasksPerPage,
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
  const currentPage = parseInt(page, 10);
  const tasksPerPage = parseInt(limit, 10);

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
      currentPage,
      tasksPerPage,
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
