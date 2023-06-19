"use client";

import useModalState from "@/utils/modalState";
import useTheme from "@/utils/themeState";
import { PlusIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export function NewButton() {
  const openModal = useModalState((state) => state.openModal);
  const newJobClick = () => {
    openModal("addInfo");
  };
  return (
    <div
      className="button_transition flex cursor-pointer items-center gap-1 rounded-full border-2 border-black p-4 hover:border-blue-400 hover:text-blue-400 dark:border-white dark:hover:border-blue-400 sm:rounded-xl sm:px-2 sm:py-1 "
      onClick={() => newJobClick()}
    >
      <PlusIcon className="h-6 w-6 sm:h-5 sm:w-5" />
      <h1 className="hidden shrink-0 sm:block">New</h1>
    </div>
  );
}

export function ThemeButton() {
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
