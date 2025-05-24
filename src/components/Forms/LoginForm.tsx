"use client";

import { loginAction } from "@/hooks/actions";
import userLogin from "@/hooks/auth/userLogin";
import { LoginFormType } from "@/lib/types";
import { loginFormSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, IdCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const LoginForm = () => {
  const [vis, setVis] = useState(false);

  const rhform = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  const { isSubmitting, isValid } = rhform.formState;

  const loginFormFunc = async (lfData: LoginFormType) => {
    const { message, success } = await userLogin(lfData);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      await loginAction();
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form
          onSubmit={rhform.handleSubmit(loginFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              <Separator className="w-full" />

              <FormField
                control={rhform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rhform.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-end">
                        <Input
                          type={vis ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute pe-2"
                          onClick={() => setVis(!vis)}
                        >
                          {vis ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <IdCard />
                )}
                Login
              </Button>

              <Separator className="w-full" />
            </CardContent>

            <CardFooter className="p-2">
              <span className="flex w-full justify-center gap-1 text-sm">
                Don &apos; t have an account?
                <Link
                  href={"/auth/register"}
                  className="font-semibold hover:underline"
                >
                  Register
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
