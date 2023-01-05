import AppDataSource from "../../data-source";
import { IUser } from "../../interfaces/users/index";
import { User } from "../../entities/user.entity";
import { usersWithoutPasswordSerializer } from "../../serializers/users/return.serializers";

export const listUsers = async (): Promise<Array<IUser>> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const usersWithoutPass = await usersWithoutPasswordSerializer.validate(
    users,
    {
      stripUnknown: true,
    }
  );

  return usersWithoutPass!;
};
