import { Router } from "express";
import {
  createUserController,
  delUserController,
  getUsersController,
  updateUserController,
} from "../controllers/users.controllers";

import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { isAdmMW, isUpdtAdmMW } from "../middlewares/isAdm.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);

userRoutes.get("", ensureAuthMiddleware, isAdmMW, getUsersController);

userRoutes.delete("/:id", ensureAuthMiddleware, isAdmMW, delUserController);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isUpdtAdmMW,
  updateUserController
);
