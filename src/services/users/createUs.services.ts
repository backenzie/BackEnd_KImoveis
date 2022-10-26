import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users/users.interfaces";
import { hashSync } from "bcrypt";
import { AppError } from "../../errors/appErrors";

export const createUsService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<User> => {
  const userRep = AppDataSource.getRepository(User);
  const emailExist = await userRep.findOneBy({ email });

  if (emailExist) {
    throw new AppError("Email Already exists", 400);
  }
  if (!password) {
    throw new AppError("password is missing", 404);
  }

  const hashPassword = hashSync(password, 10);

  const user = userRep.create({
    name,
    email,
    isAdm,
    password: hashPassword,
  });
  await userRep.save(user);

  return user;
};
