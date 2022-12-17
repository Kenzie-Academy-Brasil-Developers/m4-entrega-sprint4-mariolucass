import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup/lib/schema";

export const ensureValidData =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validatedData;

      return next();
    } catch (error: any) {
      return res.status(401).json({
        message: error.errors[0],
      });
    }
  };

export const ensureUpdateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const key in req.body) {
    if (key === "isAdm" || key === "id" || key === "isActive") {
      return res.status(401).json({
        message: "Cannot update user",
      });
    } else {
      return next();
    }
  }
};
