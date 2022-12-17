import { userWithoutPassword } from "./../../serializers/user/index";
import { AppError } from "./../../errors/appError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import {
  IUser,
  IUserRequest,
  IUserUpdate,
} from "./../../interfaces/users/index";
import "dotenv/config";

export const createUser = async (
  data: IUserRequest
): Promise<[number, IUser]> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create(data);

  await userRepository.save(user);

  const userWithoutPass = await userWithoutPassword.validate(user, {
    stripUnknown: true,
  });

  return [201, userWithoutPass];
};

export const listUsers = async (): Promise<[number, IUser[]]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  return [200, users];
};

export const updateUser = async (
  id: string,
  data: IUserUpdate
): Promise<[number, IUser | { message: string }]> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    // throw new AppError("User not found", 400);
    return [400, { message: "User not found" }];
  }

  const updateUser = userRepository.create({
    ...user,
    ...data,
  });

  await userRepository.save(updateUser);
  const updatedUserWithoutPassword = await userWithoutPassword.validate(
    updateUser,
    {
      stripUnknown: true,
    }
  );

  return [200, updatedUserWithoutPassword];
};

export const deleteUser = async (
  id: string
): Promise<[number, { message: string }]> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    //throw new AppError("User not found", 400);
    return [400, { message: "User not found" }];
  }

  if (user.isActive === false) {
    return [400, { message: "Cannot delete this user" }];
  }

  const deletedUser = userRepository.create({
    ...user,
    isActive: false,
  });

  await userRepository.save(deletedUser);

  return [204, { message: "deleted successfully" }];
};
