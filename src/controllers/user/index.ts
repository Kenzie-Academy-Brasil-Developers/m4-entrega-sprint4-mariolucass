import { IUserRequest, IUserUpdate } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import * as services from "../../services";

export const createUserController = async (req: Request, res: Response) => {
  const data: IUserRequest = req.body;
  const [status, info] = await services.createUser(data);

  return res.status(status).json(info);
};

export const updateUserController = async (req: Request, res: Response) => {
  const data: IUserUpdate = req.body;
  const id = req.user.id;
  const [status, info] = await services.updateUser(id, data);

  return res.status(status).json(info);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const [status, info] = await services.deleteUser(id);

  return res.status(status).json(info);
};

export const getUsersController = async (req: Request, res: Response) => {
  const [status, info] = await services.listUsers();

  return res.status(status).json(info);
};
