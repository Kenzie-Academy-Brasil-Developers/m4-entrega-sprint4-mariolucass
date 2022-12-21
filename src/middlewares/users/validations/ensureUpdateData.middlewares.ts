import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup/lib/schema";

export const ensureUpdateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const key in req.body) {
    if (key === "isAdm" || key === "id" || key === "isActive") {
      throw new AppError("Cannot update user", 401);
    }

    return next();
  }
};
