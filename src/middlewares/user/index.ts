import { AppError } from "./../../errors/appError";
import { User } from "./../../entities/user.entity";
import jwt from "jsonwebtoken";
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
    return res.status(404).json({
      message: "User not found",
    });
    throw new AppError("User not found", 400);
  }

  return next();
};

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
    return res.status(400).json({ message: "User already exists" });
    throw new AppError("User already exists", 400);
  }

  return next();
};

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

  return res.status(401).json({ message: "Missing admin permitions" });
};

export const ensureAuthPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    //throw new AppError("not authorized", 400);
    return res.status(401).json({ message: "not authorized" });
  }

  authorization = authorization.split(" ")[1];

  jwt.verify(authorization, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive,
    };
  });
  return next();
};

export const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdmin = req.user.isAdm === true;

  if (!userIsAdmin) {
    return res.status(403).json({ message: "Missing admin permissions" });
  }

  return next();
};
