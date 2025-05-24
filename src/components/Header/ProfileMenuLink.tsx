import getProfileByAuth from "@/hooks/profile/getProfileByAuth";
import Link from "next/link";

const ProfileMenuLink = async () => {
  const { data, isError } = await getProfileByAuth();

  if (isError) {
    return (
      <>
        <div className="">Something went wrong</div>
      </>
    );
  }

  return (
    <>
      <Link href={"/profile"} className="capitalize">
        Hello, {data?.first_name}
      </Link>
    </>
  );
};

export default ProfileMenuLink;
