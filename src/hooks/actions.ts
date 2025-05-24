"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const profileUpdateAction = async () => {
  revalidatePath("/profile");

  revalidateTag("getProfileByAuth");
};

export const logoutAction = async () => {
  redirect(`/auth/login`);
};

export const loginAction = async () => {
  revalidateTag("getProfileByAuth");

  redirect(`/`);
};

export const todoRefetchAction = async () => {
  revalidateTag("getAllTodo");

  revalidatePath("/");
};
