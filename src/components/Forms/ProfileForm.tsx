"use client";

import { profileUpdateAction } from "@/hooks/actions";
import updateProfileByAuth from "@/hooks/profile/updateProfileByAuth";
import { ProfileFormType, UserProfileType } from "@/lib/types";
import { profileFormSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

type ProfileFormProps = {
  profile: UserProfileType | null;
};

const ProfileForm = ({ profile }: ProfileFormProps) => {
  const rhform = useForm<ProfileFormType>({
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: profile?.email || "",
    },
    resolver: zodResolver(profileFormSchema),
    mode: "all",
  });

  const profileFormFunc = async (pData: ProfileFormType) => {
    if (
      profile?.email === pData.email &&
      profile?.first_name === pData.first_name &&
      profile?.last_name === pData.last_name
    ) {
      toast.warn("Already Updated!");

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      const { success, message } = await updateProfileByAuth(pData);

      if (!success) {
        toast.error(message);
      }
      if (success) {
        toast.success(message);

        await profileUpdateAction();
      }
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form
          onSubmit={rhform.handleSubmit(profileFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Profile
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
                      <Input
                        placeholder="Enter your First Name"
                        {...field}
                        disabled={rhform.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rhform.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your Last Name"
                        {...field}
                        disabled={rhform.formState.isSubmitting}
                      />
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
                      <Input
                        placeholder="Enter your Email"
                        {...field}
                        disabled={rhform.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                disabled={rhform.formState.isSubmitting}
              >
                <IdCard /> Update
              </Button>

              <Separator className="w-full" />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
