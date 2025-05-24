import env from "@/lib/env";
import kyClient from "@/lib/ky/kyClient";
import {
  AuthEmailType,
  DefautResponseType,
  RegisterFormType,
} from "@/lib/types";
import { HTTPError } from "ky";

const userRegister = async (rfData: RegisterFormType) => {
  try {
    const { data } = await kyClient
      .get("users", {
        next: { tags: ["userEmailCheck"] },
        searchParams: {
          filter: JSON.stringify({
            email: {
              _eq: rfData.email,
            },
          }),
        },
      })
      .json<DefautResponseType<AuthEmailType[]>>();

    if (data.length === 0) {
      await kyClient.post("users", {
        next: { tags: ["authRegister"] },
        json: {
          first_name: rfData.first_name,
          email: rfData.email,
          password: rfData.password,
          role: env.NEXT_PUBLIC_USER_ROLE_ID,
        },
      });

      return {
        success: true,
        message: "User Registeration Successfull",
      };
    } else {
      return {
        success: false,
        message: `Email ${rfData.email} already exists`,
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

export default userRegister;
