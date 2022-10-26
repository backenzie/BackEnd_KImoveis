import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import { listPropertiesService } from "../services/properties/listProperties.services";
import { createPropertiesService } from "../services/properties/createProperties.services";

export const createPropertiesController = async (
  req: Request,
  res: Response
) => {
  const properties: IPropertyRequest = req.body;

  const createdPropertie = await createPropertiesService(properties);

  return res.status(201).json(createdPropertie);
};

export const listPropertiescontroller = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();

  return res.status(200).json(properties);
};
