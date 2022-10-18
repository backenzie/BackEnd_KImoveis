import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdateRequest } from "../../interfaces/users.interfaces";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appErrors";

export const updService = async (id: string, user: any) => {
  if ("isAdm" in user) {
    throw new AppError("isAdm not be altered", 401);
  }
  if ("isActive" in user) {
    throw new AppError("isActive not be altered", 401);
  }
  if ("id" in user) {
    throw new AppError("id not be altered", 401);
  }
  const userRep = AppDataSource.getRepository(User);

  const findUser = await userRep.findOneBy({
    id,
  });
  const userUpdt = { ...findUser, ...user };

  await userRep.save(userUpdt);
  return userUpdt;
};
