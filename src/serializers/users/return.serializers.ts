import * as yup from "yup";
import { IUser } from "../../interfaces/users/index";
import { SchemaOf } from "yup";

export const userWithoutPasswordSerializer: SchemaOf<IUser> = yup
  .object()
  .shape({
    id: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  });

export const usersWithoutPasswordSerializer = yup.array(
  userWithoutPasswordSerializer
);
