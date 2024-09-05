import { Request, Response } from "express";
import {
  deleteItem,
  getAllItems,
  getItem,
  getItems,
  getNumberOfTotalItems,
  getUserItem,
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

  try {
    if (search === "" && !page && !limit) {
      const tasks = await getAllItems("task", userId, { key: "created_at" });

      return res.json({
        tasks,
        message: "All Tasks obtained successfully",
      });
    } else if (page && limit) {
      const offset = (page - 1) * limit;

      const tasks = await getItems(
        "task",
        userId,
        { key: "title", value: search },
        limit,
        offset,
        { key: "created_at" }
      );

      const [{ totalCount }] = await getNumberOfTotalItems(
        "task",
        userId,
        "id"
      );

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
        message: "Tasks obtained successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failure to obtain tasks",
    });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const userId = await getUserId(req?.userId);

  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }

  const createTaskValidation = createTaskSchema.safeParse(req.body);

  if (!createTaskValidation.success) {
    return res.status(400).json({
      message: `${createTaskValidation.error.issues.map((issue) => issue.message).join(", ")}`,
    });
  }

  const { title } = createTaskValidation.data;

  const existingTask = await getUserItem("task", userId, "title", title);
  if (existingTask && existingTask.user_id === userId) {
    return res.status(409).json({ message: "Task already created" });
  }

  try {
    const result = await insertItem("task", {
      title,
      state: "To do",
      user_id: userId,
    });

    const newTask = await getItem("task", "id", Number(result.insertId));

    return res.status(201).json({
      newTask,
      message: "Task created successfully!",
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
      updatedTask,
      message: "Task successfully updated",
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
    const deletedTask = await getItem("task", "id", id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const result = await deleteItem("task", id);

    if (result[0].numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res
      .status(200)
      .json({ deletedTask, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
