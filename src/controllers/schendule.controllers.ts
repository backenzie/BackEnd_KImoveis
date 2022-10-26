import { Request, Response } from "express";
import { createSchenduleService } from "../services/schendules/createSchendule.services";
import { IScheduleRequest } from "../interfaces/schedules";
import { listSchendPropService } from "../services/schendules/listSchendProper.services";

export const createSchenduleController = async (
  req: Request,
  res: Response
) => {
  const idUser = req.user.id;

  const schendule: IScheduleRequest = req.body;

  const schendules = await createSchenduleService(idUser, schendule);

  return res.status(201).json({ schendules, message: "schendule created" });
};

export const listSchendulesPropertiesController = async (
  req: Request,
  res: Response
) => {
  const idSchend = req.params.id;

  const properties = await listSchendPropService(idSchend);

  return res.status(200).json(properties);
};
