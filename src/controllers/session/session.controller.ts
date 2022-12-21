import * as services from "../../services";
import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users/index";

export const loginUserController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const info = await services.loginUser(data);

  return res.status(200).json(info);
};
