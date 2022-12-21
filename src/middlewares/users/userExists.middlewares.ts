import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";

export const ensureUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};
