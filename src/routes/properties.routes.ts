import { Router } from "express";
import { createPropertiesController } from "../controllers/properties.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { listPropertiescontroller } from "../controllers/properties.controllers";
import { isAdmMW } from "../middlewares/isAdm.middleware";

export const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  isAdmMW,
  createPropertiesController
);

propertiesRoutes.get("", listPropertiescontroller);
