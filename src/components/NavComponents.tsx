"use client";

import useJobList from "@/utils/jobList";
import useModalState from "@/utils/modalState";
import useTheme from "@/utils/themeState";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const setJobSearch = useJobList((state) => state.setJobSearch);
  return (
    <div className="hidden items-center gap-4 sm:flex">
      <MagnifyingGlassIcon className="h-5 w-5" />
      <input
        type="text"
        className="bg-transparent"
        placeholder="Search exisiting jobs"
        onChange={(e) => {
          setJobSearch(e.target.value);
        }}
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
      className="button_transition flex cursor-pointer items-center gap-1 rounded-xl border-2 border-black px-2 py-1 hover:border-blue-400 hover:text-blue-400 dark:border-white dark:hover:border-blue-400 "
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
      className="button_transition flex cursor-pointer rounded-full border-2 border-black p-2  hover:border-blue-400 hover:text-blue-400 dark:border-white dark:hover:border-blue-400"
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
  const [hexCode, setHexCode] = useState("#ffffff");
  const codes = "0123456789ABCDEF";

  useEffect(() => {
    let randomHex = "";
    for (let i = 0; i < 6; i++) {
      randomHex += codes[Math.floor(Math.random() * codes.length)];
    }
    setHexCode(`#${randomHex}`);
  }, []);

  if (status === "authenticated") {
    return (
      <div
        style={{ backgroundColor: hexCode }}
        className=" flex rounded-full p-2"
        onClick={() => signOut()}
      >
        {data?.user?.name?.split(" ")[0][0]}
        {data?.user?.name?.split(" ")[1][0]}
      </div>
    );
  }

  return <></>;
}

export default NavComponents;
