import * as services from "../../services";
import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/users/index";

export const updateUserController = async (req: Request, res: Response) => {
  const data: IUserUpdate = req.body;
  const id = req.params.id;
  const info = await services.updateUser(id, data);

  return res.status(200).json(info);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const info = await services.deleteUser(id);

  return res.status(204).json(info);
};
