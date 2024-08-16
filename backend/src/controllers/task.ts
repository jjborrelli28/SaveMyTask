import { Request, Response } from "express";
import db from "../database/database";
import { QueryParams } from "../types";
import {
  createTaskSchema,
  paramsSchema,
  queryParamsSchema,
  updateTaskSchema,
} from "../validations/task";

export const getTasks = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const queryParams = queryParamsSchema.safeParse(req.query);

    if (!queryParams.success) {
      return res.status(400).json({
        message: "Parameter query validation failed",
        error: queryParams.error.issues.map((issue) => issue.message),
      });
    }

    const { search, page, limit } = queryParams.data;
    const offset = (page - 1) * limit;

    const tasks = await db
      .selectFrom("task")
      .selectAll()
      .where("title", "like", `%${search}%`)
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc")
      .execute();

    const [{ totalCount }] = await db
      .selectFrom("task")
      .select([db.fn.count("id").as("totalCount")])
      .execute();

    const totalTasks = Number(totalCount);
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;

    res.json({
      tasks,
      totalTasks,
      currentPage: page,
      tasksPerPage: limit,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const bodyValidation = createTaskSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      message: "Task body validation failed",
      error: bodyValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { title, state, user_id } = bodyValidation.data;

  try {
    const result = await db
      .insertInto("task")
      .values({
        title,
        state,
        user_id,
      })
      .executeTakeFirstOrThrow();

    const newTask = await db
      .selectFrom("task")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();

    res.status(201).json({
      message: "Task created successfully!",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Task ID is not valid",
      error: idValidation.error.issues.map((issue) => issue.message),
    });
  }

  const bodyValidation = updateTaskSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      message: "Task body validation failed",
      error: bodyValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { id } = idValidation.data;
  const { title, state } = bodyValidation.data;

  try {
    const result = await db
      .updateTable("task")
      .set({
        title,
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

    res.json({
      message: "Task successfully updated",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: "Task ID is not valid",
      error: idValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { id } = idValidation.data;

  try {
    const result = await db.deleteFrom("task").where("id", "=", id).execute();

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
