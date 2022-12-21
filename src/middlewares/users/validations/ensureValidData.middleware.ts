import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup/lib/schema";

export const ensureValidData =
  (schema: AnySchema, stripUnknown = true) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: true,
        stripUnknown,
      });

      req.body = validatedData;

      return next();
    } catch (error: any) {
      throw new AppError("Cannot update user", 401);
    }
  };
