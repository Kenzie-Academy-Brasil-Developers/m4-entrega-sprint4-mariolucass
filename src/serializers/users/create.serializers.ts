import * as yup from "yup";
import { IUserRequest } from "../../interfaces/users/index";
import { SchemaOf } from "yup";

export const userCreateSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});
