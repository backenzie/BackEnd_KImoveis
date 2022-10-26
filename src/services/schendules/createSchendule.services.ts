import AppDataSource from "../../data-source";
import { schedules } from "../../entities/usersProperties.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { AppError } from "../../errors/appErrors";
import { Properties } from "../../entities/properties.entity";
import { User } from "../../entities/user.entity";

export const createSchenduleService = async (
  userId: string,
  { date, hour, propertyId }: IScheduleRequest
): Promise<schedules> => {
  const schendulesRep = AppDataSource.getRepository(schedules);

  const userRep = AppDataSource.getRepository(User);
  const findUser = await userRep.findOneBy({ id: userId });
  const propertRep = AppDataSource.getRepository(Properties);

  const propId = await propertRep.findOne({
    where: {
      id: propertyId,
    },
  });

  if (!findUser) {
    throw new AppError("user not found", 404);
  }
  if (!propId) {
    throw new AppError("propertie not found", 404);
  }

  const dateAndHourExist = await schendulesRep.findOneBy({ date, hour });

  if (dateAndHourExist) {
    throw new AppError(
      "data e hora ocupados, tente uma nova data ou outro horário",
      400
    );
  }

  const newHour = parseInt(hour);
  const newDate = new Date(date);
  const newDateDay = newDate.getDay();

  if (newHour >= 18) {
    throw new AppError("Estamos fora do nosso horario de trabalho", 400);
  }
  if (newHour < 8) {
    throw new AppError("Estamos fora do nosso horario de trabalho", 400);
  }
  if (newDateDay < 1) {
    throw new AppError("Fins de semana, descansamos", 400);
  }
  if (newDateDay > 5) {
    throw new AppError("Fins de semana, descansamos", 400);
  }

  const schenduleDate = schendulesRep.create({
    date,
    hour,
    properties: propId,
    user: findUser,
  });

  await schendulesRep.save(schenduleDate);

  return schenduleDate;
};
