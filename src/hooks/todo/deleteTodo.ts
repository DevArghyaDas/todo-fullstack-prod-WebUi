import kyClient from "@/lib/ky/kyClient";
import { HTTPError } from "ky";

const deleteTodo = async (todoId: string) => {
  try {
    await kyClient.delete(`items/todolist/${todoId}`, {
      next: { tags: ["deleteTodo"] },
    });

    return {
      success: true,
      message: "Todo Deleted",
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

export default deleteTodo;
