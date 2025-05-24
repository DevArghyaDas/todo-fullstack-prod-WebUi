"use client";

import userRegister from "@/hooks/auth/userRegister";
import { RegisterFormType } from "@/lib/types";
import { registerFormSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, IdCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useState } from "react";

const RegisterForm = () => {
  const [vis, setVis] = useState(false);

  const { push } = useRouter();

  const rhform = useForm<RegisterFormType>({
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
    mode: "all",
  });

  const { isSubmitting, isValid } = rhform.formState;

  const registerFormFunc = async (rfData: RegisterFormType) => {
    const { message, success } = await userRegister(rfData);

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      push("/auth/login");
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form
          onSubmit={rhform.handleSubmit(registerFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Register
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              <Separator className="w-full" />

              <FormField
                control={rhform.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <IdCard />
                )}
                Register
              </Button>

              <Separator className="w-full" />
            </CardContent>

            <CardFooter className="p-2">
              <span className="flex w-full justify-center gap-1 text-sm">
                Allready have an account?
                <Link
                  href={"/auth/login"}
                  className="font-semibold hover:underline"
                >
                  Login
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
