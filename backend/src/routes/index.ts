import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTaskById,
} from "../controllers/tasks";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.patch("/tasks/:id", editTask);
router.delete("/tasks/:id", deleteTask);

export default router;
