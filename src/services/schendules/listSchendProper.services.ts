import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { schedules } from "../../entities/usersProperties.entity";
import { AppError } from "../../errors/appErrors";

export const listSchendPropService = async (
  id: string
): Promise<Properties> => {
  const schendRep = AppDataSource.getRepository(schedules);

  const propRep = AppDataSource.getRepository(Properties);

  const propertSchend = await propRep.findOne({
    where: { id: id },
    relations: { schedules: true },
  });

  if (!propertSchend) {
    throw new AppError("propertie not found", 404);
  }

  // const findSchendProp = await schendRep.find({
  //   where: {
  //     properties: {
  //       id: propertSchend.id,
  //     },
  //   },
  // });

  return propertSchend;
};
