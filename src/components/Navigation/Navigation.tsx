"use client";

import useJobList from "@/utils/jobList";
import useModalState from "@/utils/modalState";
import useTheme from "@/utils/themeState";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  PowerIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import NavComponents from "./NavComponents";
import { CustomSearchbar } from "./SearchBar";

export default function Navigation() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const setJobSearch = useJobList((state) => state.setJobSearch);
  const jobSearch = useJobList((state) => state.jobSearch);
  const searchRef = useRef<HTMLInputElement>(null);

  const openSearchBar = () => {
    setIsMobileSearchOpen(true);
  };

  useEffect(() => {
    const closeSearchBar = (e: any) => {
      if (e.target !== searchRef.current) {
        setIsMobileSearchOpen(false);
      }
    };
    document.body.addEventListener("click", closeSearchBar);
    return () => {
      document.body.removeEventListener("click", closeSearchBar);
    };
  }, []);

  return (
    <div className="flex bg-slate-200 px-6 py-4 dark:bg-zinc-800 dark:text-white">
      <div className="flex w-full">
        <div className="flex w-full sm:hidden">
          {isMobileSearchOpen ? (
            <div className="flex w-full items-center gap-4 ">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <CustomSearchbar
                ref={searchRef}
                type="text"
                className="w-full bg-transparent p-2"
                placeholder="Search exisiting jobs"
                value={jobSearch}
                onChange={(e: any) => {
                  setJobSearch(e.target.value);
                }}
              />
            </div>
          ) : (
            <NavComponents>
              <div className="button_transition flex cursor-pointer rounded-full p-2 hover:text-blue-400 sm:hidden">
                <MagnifyingGlassIcon
                  className="h-5 w-5"
                  onClick={() => openSearchBar()}
                />
              </div>
            </NavComponents>
          )}
        </div>
        <div className="hidden w-full sm:flex">
          <NavComponents />
        </div>
      </div>
    </div>
  );
}
