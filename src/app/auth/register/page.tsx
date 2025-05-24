import RegisterForm from "@/components/Forms/RegisterForm";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Register | Todo FS",
  };
};

const page = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default page;
