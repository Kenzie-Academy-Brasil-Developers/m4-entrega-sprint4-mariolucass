import { userWithoutPasswordSerializer } from "../../serializers";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users/index";

export const createUser = async (data: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create(data);

  await userRepository.save(user);

  const userWithoutPass = await userWithoutPasswordSerializer.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPass;
};
