"use client";

import useTheme from "@/utils/themeState";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import NewNote from "@/utils/newNote";
import useModalState from "@/utils/modalState";

function NavComponents() {
  const data = useSession();

  return (
    <>
      <Searchbar />
      <div className="flex items-center gap-4 ">
        <NewButton />
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
      className="flex cursor-pointer items-center gap-2 border-black px-2 py-1 dark:border-white sm:border-2"
      onClick={() => newJobClick()}
    >
      <PlusIcon className="h-5 w-5" />
      <h1 className="hidden shrink-0 sm:block">New Job</h1>
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
        Welcome, {data?.user?.name?.split(" ")[0][0]}
        {data?.user?.name?.split(" ")[1][0]}
      </div>
    );
  }

  return <></>;
}

export default NavComponents;
