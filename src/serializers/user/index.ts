import {
  IUser,
  IUserRequest,
  IUserUpdate,
} from "./../../interfaces/users/index";

import { SchemaOf } from "yup";
import * as yup from "yup";

export const userWithoutPassword: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export const userUpdate: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
});

export const userCreate: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});
