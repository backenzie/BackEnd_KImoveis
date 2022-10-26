import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

export const listSCategoriesService = async (): Promise<Categories[]> => {
  const categoriesRepositorie = AppDataSource.getRepository(Categories);

  const categories = categoriesRepositorie.find();

  return categories;
};
