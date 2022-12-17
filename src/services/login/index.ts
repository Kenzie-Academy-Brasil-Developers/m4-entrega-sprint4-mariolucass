import { AppError } from "./../../errors/appError";
import { User } from "./../../entities/user.entity";
import { IUserLogin } from "./../../interfaces/users/index";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginUser = async (
  data: IUserLogin
): Promise<[number, { token: string } | { message: string }]> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: data.email,
  });

  if (!user) {
    // throw new AppError("User or password invalid", 401);
    return [403, { message: "User or password invalid" }];
  }

  const passwordMatch = await compare(data.password, user.password);
  if (!passwordMatch) {
    // throw new AppError("User or password invalid", 401);
    return [403, { message: "User or password invalid" }];
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      isActive: user.isActive,
    },

    process.env.SECRET_KEY!,
    { subject: user.id, expiresIn: "24h" }
  );

  return [200, { token: token }];
};
