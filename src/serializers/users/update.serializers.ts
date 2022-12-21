import * as yup from "yup";
import { IUserUpdate } from "../../interfaces/users/index";
import { SchemaOf } from "yup";

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
});
