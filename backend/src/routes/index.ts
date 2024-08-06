import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTaskList,
  updateTask,
} from "../controllers/tasks";

const router = express.Router();

router.get("/tasks", getTaskList);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
