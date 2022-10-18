import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/login.interfaces";
import { createLoginService } from "../services/login/createLgin.services";

export const createLoginController = async (req: Request, res: Response) => {
  const data: ISessionRequest = req.body;
  const token = await createLoginService(data);
  return res.json({ token });
};
