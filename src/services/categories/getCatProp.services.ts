import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors";

export const getCatPropService = async (id: string): Promise<Categories> => {
  const catRep = AppDataSource.getRepository(Categories);
  const propRep = AppDataSource.getRepository(Properties);

  const catProperties = await catRep.findOne({
    where: {
      id,
    },
    relations: {
      properties: true,
    },
  });
  if (!catProperties) {
    throw new AppError("Categorie not found", 404);
  }

  return catProperties;
};
