import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task";
import { createUser } from "../controllers/user";

const router = express.Router();

// User routes
router.post("/user", createUser);

// Task routes
router.get("/task", getTasks);
router.post("/task", createTask);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
