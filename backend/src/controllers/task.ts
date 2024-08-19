import { Request, Response } from "express";
import {
  deleteItem,
  getItem,
  getItems,
  getNumberOfTotalItems,
  insertItem,
  updateItem,
} from "../helpers/database";
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
        message: `${queryParams.error.issues.map((issue) => issue.message)}`,
      });
    }

    const { search, page, limit } = queryParams.data;
    const offset = (page - 1) * limit;

    const tasks = await getItems(
      "task",
      { key: "title", value: search },
      limit,
      offset,
      { key: "created_at" }
    );

    const [{ totalCount }] = await getNumberOfTotalItems("task", "id");

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
      message: "Failure to obtain tasks",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const createTaskValidation = createTaskSchema.safeParse(req.body);

  if (!createTaskValidation.success) {
    return res.status(400).json({
      message: `${createTaskValidation.error.issues.map((issue) => issue.message)}`,
    });
  }

  const { title, user_id } = createTaskValidation.data;

  try {
    const result = await insertItem("task", {
      title,
      state: "To do",
      user_id,
    });

    const newTask = await getItem("task", "id", Number(result.insertId));

    res.status(201).json({
      message: "Task created successfully!",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: `${idValidation.error.issues.map((issue) => issue.message)}`,
    });
  }

  const updateTaskValidation = updateTaskSchema.safeParse(req.body);

  if (!updateTaskValidation.success) {
    return res.status(400).json({
      error: updateTaskValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { id } = idValidation.data;
  const newTaskData = updateTaskValidation.data;

  try {
    const result = await updateItem("task", id, {
      ...newTaskData,
      updated_at: new Date(),
    });

    if (result[0].numUpdatedRows === BigInt(0))
      res.status(404).json({ error: "Task not found" });

    const updatedTask = await getItem("task", "id", id);

    res.json({
      message: "Task successfully updated",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      error: idValidation.error.issues.map((issue) => issue.message),
    });
  }

  const { id } = idValidation.data;

  try {
    const result = await deleteItem("task", id);

    if (result[0].numDeletedRows === BigInt(0))
      res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully", id });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
