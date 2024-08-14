import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTaskList,
  updateTask,
} from "../controllers/tasks";
import { createUser } from "../controllers/users";

const router = express.Router();

// Tasks routes
router.get("/tasks", getTaskList);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// Users routes
router.post("/users", createUser);

export default router;
