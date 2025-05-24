import kyClient from "@/lib/ky/kyClient";
import { AuthEmailType, DefautResponseType, LoginFormType } from "@/lib/types";
import { HTTPError } from "ky";

const userLogin = async (lfData: LoginFormType) => {
  try {
    const { data } = await kyClient
      .get("users", {
        next: { tags: ["userEmailCheck"] },
        searchParams: {
          filter: JSON.stringify({
            email: {
              _eq: lfData.email,
            },
          }),
        },
      })
      .json<DefautResponseType<AuthEmailType[]>>();

    if (data.length === 1) {
      await kyClient.post("auth/login", {
        next: { tags: ["authLogin"] },
        json: {
          email: lfData.email,
          password: lfData.password,
          mode: "session",
        },
      });

      return {
        success: true,
        message: "User Login Successfull",
      };
    } else {
      return {
        success: false,
        message: `Email ${lfData.email} is not registered`,
      };
    }
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

export default userLogin;
