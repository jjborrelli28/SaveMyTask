import express, { type Response } from "express";

import authentication, {
  type RequestProps,
} from "../middleware/authentication";

import createTask from "../controllers/task/create";
import deleteTask from "../controllers/task/detete";
import getTasks from "../controllers/task/get";
import updateTask from "../controllers/task/update";
import login from "../controllers/user/login";
import logout from "../controllers/user/logout";

import createUser from "../controllers/user/create";
import deleteUser from "../controllers/user/delete";
import getUser from "../controllers/user/get";
import updateUser from "../controllers/user/update";

const router = express.Router();

// Authentication
router.get("/authentication", async (req: RequestProps, res: Response) => {
  if (req.cookies.token) {
    res
      .status(200)
      .json({ isAuthenticated: true, message: "User is authenticated" });
  } else {
    res
      .status(200)
      .json({ isAuthenticated: false, message: "User is not authenticated" });
  }
});

// User routes
router.post("/user/login", login);
router.get("/user/logout", authentication, logout);
router.get("/user/me", authentication, getUser);
router.post("/user", createUser);
router.patch("/user/me", authentication, updateUser);
router.delete("/user/me", authentication, deleteUser);

// Task routes
router.get("/task", authentication, getTasks);
router.post("/task", authentication, createTask);
router.patch("/task/:id", authentication, updateTask);
router.delete("/task/:id", authentication, deleteTask);

export default router;
