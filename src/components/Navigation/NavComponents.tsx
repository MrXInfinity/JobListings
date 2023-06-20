"use client";

import { useSession } from "next-auth/react";
import { NewButton, ThemeButton } from "./NavButtons";
import { Searchbar } from "./SearchBar";
import { AccountInfo } from "./AccountInfo";

export default function NavComponents({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { status } = useSession();

  return (
    <div className="flex w-full items-center justify-between ">
      <h1 className="font-bold">Job Listings</h1>
      <div className="hidden sm:flex">
        <Searchbar />
      </div>
      <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
        {status === "authenticated" && (
          <div className="hidden sm:flex">
            <NewButton />
          </div>
        )}
        {children}
        <ThemeButton />
        <AccountInfo />
      </div>
    </div>
  );
}
