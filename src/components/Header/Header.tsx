import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeToggleButton from "./ThemeToggleButton";
import ProfileMenuLink from "./ProfileMenuLink";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-foreground/20 shadow-sm">
      <div className="mx-auto flex h-[52px] max-w-screen-lg items-center justify-between px-6">
        <Link href={"/"} className="text-2xl font-bold">
          Todo FS
        </Link>

        <nav className="flex items-center gap-4">
          <LogoutButton>
            <ProfileMenuLink />
          </LogoutButton>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
