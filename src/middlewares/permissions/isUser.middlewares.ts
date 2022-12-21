import { AppError } from "./../../errors/appError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureIsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user.id === req.params.id) {
    return next();
  }

  if (user.isAdm === true) {
    return next();
  }

  throw new AppError("Missing admin permissions", 401);
};
