import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

export const updService = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const userRep = AppDataSource.getRepository(User);

  const findUser = await userRep.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("user not found", 404);
  }

  const data = Object.keys(user);
  const isAdm = data.includes("isAdm");
  const idUser = data.includes("id");
  const isActive = data.includes("isActive");

  if (user.password) {
    user.password = await hash(user.password, 10);
  }
  if (isAdm || idUser || isActive) {
    throw new AppError("unable to update this fields", 401);
  }

  await userRep.update(findUser!.id, {
    ...findUser,
    ...user,
    updatedAt: new Date(),
  });

  return findUser;
};
