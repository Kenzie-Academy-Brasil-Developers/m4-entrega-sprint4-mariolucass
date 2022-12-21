import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup/lib/schema";

export const ensureValidData =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true,
        strict: false,
      });

      console.log(validatedData);

      if (!validatedData) {
        throw new AppError("Cannot update user", 401);
      }

      req.body = validatedData;

      return next();
    } catch (error: any) {
      console.log(error);
      throw new AppError(`"Cannot update user"`, 401);
    }
  };
