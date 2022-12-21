import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";

export const ensureUserNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: req.body.email,
  });

  if (user) {
    throw new AppError("User already exists", 400);
  }

  return next();
};
