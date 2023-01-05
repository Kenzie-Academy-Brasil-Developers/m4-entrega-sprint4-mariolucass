import AppDataSource from "../../data-source";
import { AppError } from "./../../errors/appError";
import { userWithoutPasswordSerializer } from "../../serializers";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users/index";
import "dotenv/config";

export const updateUser = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  for (const key in data) {
    if (key === "isAdm" || key === "id" || key === "isActive") {
      throw new AppError("Cannot update user", 401);
    }
  }

  const updateUser = userRepository.create({
    ...user,
    ...data,
  });

  await userRepository.save(updateUser);

  const userWithoutPass = await userWithoutPasswordSerializer.validate(
    updateUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPass;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
      isActive: true,
    },
  });

  if (!user) {
    throw new AppError("User is not active", 400);
  }

  const deletedUser = userRepository.create({
    ...user,
    isActive: false,
  });

  await userRepository.save(deletedUser);

  return { message: "deleted successfully" };
};
