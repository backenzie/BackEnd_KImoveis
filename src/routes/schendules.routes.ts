import { Router } from "express";
import {
  createSchenduleController,
  listSchendulesPropertiesController,
} from "../controllers/schendule.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { isAdmMW } from "../middlewares/isAdm.middleware";

export const schenduleRoutes = Router();

schenduleRoutes.post(
  "",
  ensureAuthMiddleware,

  createSchenduleController
);
schenduleRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  isAdmMW,
  listSchendulesPropertiesController
);
