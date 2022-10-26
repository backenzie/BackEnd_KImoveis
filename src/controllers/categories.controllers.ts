import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import { getCatPropService } from "../services/categories/getCatProp.services";
import { createCategoryService } from "../services/categories/createCategory.services";
import { listSCategoriesService } from "../services/categories/getCategories.services";

export const createCategorieController = async (
  req: Request,
  res: Response
) => {
  const name: ICategoryRequest = req.body;

  const id = req.body.id;
  const createdCat = await createCategoryService(id, name);

  return res.status(201).json(createdCat);
};

export const listCategoriescontroller = async (req: Request, res: Response) => {
  const categories = await listSCategoriesService();

  return res.json(categories);
};

export const listCatPropController = async (req: Request, res: Response) => {
  const idCat = req.params.id;

  const catProperties = await getCatPropService(idCat);

  return res.json(catProperties);
};
