import { AppError } from "./../../errors/appError";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

export const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdmin = req.user.isAdm === true;

  if (!userIsAdmin) {
    throw new AppError("Missing admin permissions", 403);
  }

  return next();
};
