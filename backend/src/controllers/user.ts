import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  deleteItem,
  getItem,
  insertItem,
  updateItem,
} from "../helpers/database";
import hashPassword from "../helpers/hash-password";
import { generateToken } from "../helpers/jwt";
import {
  createUserSchema,
  deleteUserSchema,
  loginSchema,
  paramsSchema,
  updateUserSchema,
} from "../validations/user";









