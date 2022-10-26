import { Router } from "express";
import {
  createCategorieController,
  listCategoriescontroller,
  listCatPropController,
} from "../controllers/categories.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { isAdmMW } from "../middlewares/isAdm.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  isAdmMW,
  createCategorieController
);

categoriesRoutes.get("", listCategoriescontroller);

categoriesRoutes.get("/:id/properties", listCatPropController);
