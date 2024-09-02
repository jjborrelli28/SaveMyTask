import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task";
import { createUser, getUser, login } from "../controllers/user";
import { authentication } from "../middleware/authentication";

const router = express.Router();

// User routes
router.post("/user", createUser);
router.post("/user/login", login);
router.get("/user/:id", getUser);

// Task routes
router.get("/task", authentication, getTasks);
router.post("/task", authentication, createTask);
router.patch("/task/:id", authentication, updateTask);
router.delete("/task/:id", authentication, deleteTask);

export default router;
