import kyClient from "@/lib/ky/kyClient";
import { TodoFormType } from "@/lib/types";
import { HTTPError } from "ky";

const addTodo = async (tData: TodoFormType) => {
  try {
    await kyClient.post("items/todolist", {
      next: { tags: ["addTodo"] },
      json: tData,
    });

    return {
      success: true,
      message: "TODO Added",
    };
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>(); // eslint-disable-line

      return {
        success: false,
        message: errorJson.errors[0].message as string,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default addTodo;
