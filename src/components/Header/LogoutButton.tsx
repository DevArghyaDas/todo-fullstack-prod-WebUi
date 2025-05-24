"use client";

import { logoutAction } from "@/hooks/actions";
import userLogout from "@/hooks/auth/userLogout";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  children: ReactNode;
};

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const pathname = usePathname();

  const logoutFunc = async () => {
    const { message, success } = await userLogout();

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      await logoutAction();
    }
  };

  if (pathname === "/" || pathname === "/profile") {
    return (
      <>
        {children}

        <Button onClick={logoutFunc} variant={"destructive"} className="py-1">
          <LogOut size={28} /> Logout
        </Button>
      </>
    );
  }

  return <></>;
};

export default LogoutButton;
