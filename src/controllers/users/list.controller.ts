import * as services from "../../services";
import { Request, Response } from "express";

export const getUsersController = async (req: Request, res: Response) => {
  const info = await services.listUsers();

  return res.status(200).json(info);
};
