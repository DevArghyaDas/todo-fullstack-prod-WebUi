import LoginForm from "@/components/Forms/LoginForm";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Login | Todo FS",
  };
};

const page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
