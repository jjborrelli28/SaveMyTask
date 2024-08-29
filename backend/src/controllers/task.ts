import { Request, Response } from "express";
import {
  deleteItem,
  getItem,
  getItems,
  getNumberOfTotalItems,
  insertItem,
  updateItem,
} from "../helpers/database";
import getUserId from "../helpers/get-user-id";
import { AuthenticatedRequest } from "../types";
import {
  createTaskSchema,
  paramsSchema,
  queryParamsSchema,
  updateTaskSchema,
} from "../validations/task";

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  const userId = await getUserId(req?.userId);

  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }

  const queryParams = queryParamsSchema.safeParse(req.query);

  if (!queryParams.success) {
    return res.status(400).json({
      message: `${queryParams.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { search, page, limit } = queryParams.data;
  const offset = (page - 1) * limit;

  try {
    const tasks = await getItems(
      "task",
      userId,
      { key: "title", value: search },
      limit,
      offset,
      { key: "created_at" }
    );

    const [{ totalCount }] = await getNumberOfTotalItems("task", userId, "id");

    const totalTasks = Number(totalCount);
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;

    return res.json({
      tasks,
      totalTasks,
      currentPage: page,
      tasksPerPage: limit,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failure to obtain tasks",
    });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = await getUserId(req?.userId);
  if (!user_id) {
    return res.status(404).json({ message: "User not found" });
  }

  const createTaskValidation = createTaskSchema.safeParse(req.body);

  if (!createTaskValidation.success) {
    return res.status(400).json({
      message: `${createTaskValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { title } = createTaskValidation.data;

  try {
    const result = await insertItem("task", {
      title,
      state: "To do",
      user_id,
    });

    const newTask = await getItem("task", "id", Number(result.insertId));

    return res.status(201).json({
      message: "Task created successfully!",
      newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      message: `${idValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const updateTaskValidation = updateTaskSchema.safeParse(req.body);

  if (!updateTaskValidation.success) {
    return res.status(400).json({
      error: updateTaskValidation.error.issues
        .map((issue) => issue.message)
        .join(", "),
    });
  }

  const { id } = idValidation.data;
  const newTaskData = updateTaskValidation.data;

  try {
    const result = await updateItem("task", id, {
      ...newTaskData,
      updated_at: new Date(),
    });

    if (result[0].numUpdatedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await getItem("task", "id", id);

    return res.json({
      message: "Task successfully updated",
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const idValidation = paramsSchema.safeParse(req.params);

  if (!idValidation.success) {
    return res.status(400).json({
      error: idValidation.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  const { id } = idValidation.data;

  try {
    const result = await deleteItem("task", id);

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully", id });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
