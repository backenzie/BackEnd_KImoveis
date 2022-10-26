import { Request, Response } from "express";
import { createUsService } from "../services/users/createUs.services";
import { getUsersService } from "../services/users/getUsers.services";

import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/users/users.interfaces";
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

export const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  const id = req.params.id;

  const updatedUser = await updService(id, userData);
  return res.json({ message: "user updated", ...instanceToPlain(updatedUser) });
};
