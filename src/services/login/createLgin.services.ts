import { User } from "../../entities/user.entity";
import { ISessionRequest } from "../../interfaces/login.interfaces";
import { compare } from "bcrypt";
import { AppError } from "../../errors/appErrors";
import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createLoginService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
      email: user.email,
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};
