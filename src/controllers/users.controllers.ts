import { Request, Response } from "express";
import { createUsService } from "../services/users/createUs.services";
import { getUsersService } from "../services/users/getUsers.services";

import { instanceToPlain } from "class-transformer";
import {
  IUserUpdateRequest,
  IUserRequest,
} from "../interfaces/users.interfaces";
import deleteUserService from "../services/users/delUser.services";
import { updService } from "../services/users/updtUser.services";
import { AppError } from "../errors/appErrors";

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUsService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsersService();

  return res.json(instanceToPlain(users));
};

export const delUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteUserService(id);
  return res.status(204).send({ message: "isActive = false" });
};

// export const updateUserController = async (req: Request, res: Response) => {
//   const user: IUserUpdateRequest = req.body;

//   const id: string = req.params.id;
//   const updatedUser = await updService(user, id);

//   return res.json(updatedUser);
// };

export const updateUserController = async (req: Request, res: Response) => {
  const user = req.user;

  const userData = req.body;

  const id = req.params.id;

  if (user.id !== id && !user.isAdm) {
    throw new AppError("Not authorized", 401);
  }

  const updatedUser = await updService(id, userData);
  return res.status(200).json(updatedUser);
};
