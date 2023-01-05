import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users/index";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginUser = async (
  data: IUserLogin
): Promise<{ token: string }> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: data.email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  const passwordMatch = await compare(data.password, user.password);
  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },

    process.env.SECRET_KEY!,
    { subject: user.id, expiresIn: "24h" }
  );

  return { token: token };
};
