"use client";

import useTheme from "@/utils/themeState";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

function Searchbar() {
  return (
    <div className="flex gap-4 items-center">
      <MagnifyingGlassIcon className="h-5 w-5" />
      <input
        type="text"
        className="bg-transparent"
        placeholder="Search exisiting jobs"
      ></input>
    </div>
  );
}

function NavButtons() {
  const { isThemeDark, toggle: themeToggle } = useTheme();

  return (
    <div className="flex items-center gap-4 ">
      <div className="flex gap-2 items-center cursor-pointer border-2 border-black py-1 px-2 dark:border-white">
        <PlusIcon className="h-5 w-5" />
        <h1 className="shrink-0">New Job</h1>
      </div>
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
    </div>
  );
}

export { Searchbar, NavButtons };