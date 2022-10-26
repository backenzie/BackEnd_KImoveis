import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appErrors";
import { Categories } from "../../entities/categories.entity";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategoryService = async (
  id: string,
  { name }: ICategoryRequest
): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categorieExist = await categoriesRepository.findOneBy({ name });

  if (categorieExist) {
    throw new AppError("Name already exists", 400);
  }

  const cat = categoriesRepository.create({ name });

  await categoriesRepository.save(cat);

  return cat;
};
