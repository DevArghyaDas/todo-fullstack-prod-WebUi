import kyClient from "@/lib/ky/kyClient";
import { HTTPError } from "ky";

const userLogout = async () => {
  try {
    await kyClient.post("auth/logout", {
      next: { tags: ["authLogout"] },
      json: {
        refresh_token: "",
        mode: "session",
      },
    });

    return {
      success: true,
      message: "User Logout Successfull",
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

export default userLogout;
