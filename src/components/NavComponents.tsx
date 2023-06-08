"use client";

import useModalState from "@/utils/modalState";
import useTheme from "@/utils/themeState";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";

function NavComponents() {
  const { status } = useSession();

  return (
    <>
      <Searchbar />
      <div className="flex items-center gap-4 ">
        {status === "authenticated" && <NewButton />}
        <ThemeButton />
        <AccountInfo />
      </div>
    </>
  );
}

function Searchbar() {
  return (
    <div className="hidden items-center gap-4 sm:flex">
      <MagnifyingGlassIcon className="h-5 w-5" />
      <input
        type="text"
        className="bg-transparent"
        placeholder="Search exisiting jobs"
      ></input>
    </div>
  );
}

function NewButton() {
  const openModal = useModalState((state) => state.openModal);
  const newJobClick = () => {
    openModal("addInfo");
  };
  return (
    <div
      className="button_transition flex cursor-pointer items-center gap-1 border-2 border-black px-2 py-1 hover:border-blue-400 hover:text-blue-400 dark:border-white dark:hover:border-blue-400 "
      onClick={() => newJobClick()}
    >
      <PlusIcon className="h-5 w-5" />
      <h1 className="hidden shrink-0 sm:block">New</h1>
    </div>
  );
}

function ThemeButton() {
  const isThemeDark = useTheme((state) => state.isThemeDark);
  const themeToggle = useTheme((state) => state.toggle);

  return (
    <div
      className="flex cursor-pointer"
      onClick={themeToggle}
    >
      {isThemeDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </div>
  );
}

function AccountInfo() {
  const { data, status } = useSession();

  if (status === "authenticated") {
    return (
      <div
        className="flex"
        onClick={() => signOut()}
      >
        Hi, {data?.user?.name?.split(" ")[0][0]}
        {data?.user?.name?.split(" ")[1][0]}
      </div>
    );
  }

  return <></>;
}

export default NavComponents;
