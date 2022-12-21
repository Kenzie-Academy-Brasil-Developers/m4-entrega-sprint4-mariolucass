import { AppError } from "./../../errors/appError";
import { userWithoutPasswordSerializer } from "../../serializers";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
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
  if (!user) {
    throw new AppError("User not found", 400);
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
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (user.isActive === false) {
    throw new AppError("Cannot delete this user", 400);
  }

  const deletedUser = userRepository.create({
    ...user,
    isActive: false,
  });

  await userRepository.save(deletedUser);

  return { message: "deleted successfully" };
};
