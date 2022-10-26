import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

export const listPropertiesService = async (): Promise<Properties[]> => {
  const propertiesRepositorie = AppDataSource.getRepository(Properties);

  const propertiesFound = propertiesRepositorie.find();

  return propertiesFound;
};
