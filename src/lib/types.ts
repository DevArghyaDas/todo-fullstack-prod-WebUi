import { z } from "zod";
import {
  loginFormSchema,
  profileFormSchema,
  registerFormSchema,
  todoFormSchema,
} from "./zodSchemas";

export type LoginFormType = z.infer<typeof loginFormSchema>;
export type RegisterFormType = z.infer<typeof registerFormSchema>;
export type TodoFormType = z.infer<typeof todoFormSchema>;
export type ProfileFormType = z.infer<typeof profileFormSchema>;

export type DefautResponseType<T> = {
  data: T;
};

export type AuthEmailType = {
  email: string;
};

export type UserProfileType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type TodoType = {
  id: string;
  todoCheck: boolean;
  todoBody: string;
};
