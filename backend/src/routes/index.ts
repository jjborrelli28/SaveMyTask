import express from "express";

import createTask from "../controllers/task/create";
import deleteTask from "../controllers/task/detete";
import getTasks from "../controllers/task/get";
import updateTask from "../controllers/task/update";

import createUser from "../controllers/user/create";
import deleteUser from "../controllers/user/delete";
import getUser from "../controllers/user/get";
import login from "../controllers/user/login";
import updateUser from "../controllers/user/update";

import authentication from "../middleware/authentication";

const router = express.Router();

// User routes
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.post("/user/login", login);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Task routes
router.get("/task", authentication, getTasks);
router.post("/task", authentication, createTask);
router.patch("/task/:id", authentication, updateTask);
router.delete("/task/:id", authentication, deleteTask);

export default router;
