import kyServer from "@/lib/ky/kyServer";
import { DefautResponseType, TodoType } from "@/lib/types";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

const getAllTodo = async () => {
  const token = (await cookies()).get("directus_session_token")
    ?.value as string;

  try {
    const { data } = await kyServer
      .get("items/todolist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["getAllTodo"] },
        searchParams: {
          filter: JSON.stringify({
            user_created: {
              _eq: "$CURRENT_USER",
            },
          }),
        },
      })
      .json<DefautResponseType<TodoType[]>>();

    return {
      data: data,
      isError: false,
      error: null,
    };
  } catch (error) {
    const httpError = error as HTTPError;
    const errorJson = await httpError.response.json<any>(); // eslint-disable-line

    return {
      data: null,
      isError: true,
      error: errorJson.errors[0].message,
    };
  }
};

export default getAllTodo;
