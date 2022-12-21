import * as services from "../../services";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users/index";

export const createUserController = async (req: Request, res: Response) => {
  const data: IUserRequest = req.body;
  const info = await services.createUser(data);

  return res.status(201).json(info);
};
