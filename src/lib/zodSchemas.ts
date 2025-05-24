import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerFormSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const todoFormSchema = z.object({
  todoBody: z.string().min(1, { message: "Todo is required" }),
});

export const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  last_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});
