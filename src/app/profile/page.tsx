import ProfileForm from "@/components/Forms/ProfileForm";
import getProfileByAuth from "@/hooks/profile/getProfileByAuth";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Profile | Todo FS",
  };
};

const page = async () => {
  const { data, isError } = await getProfileByAuth();

  if (isError) {
    return null;
  }

  return (
    <>
      <ProfileForm profile={data} />
    </>
  );
};

export default page;
