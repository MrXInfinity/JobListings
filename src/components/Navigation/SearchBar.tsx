"use client";

import useJobList from "@/utils/jobList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { forwardRef } from "react";

export function Searchbar() {
  const setJobSearch = useJobList((state) => state.setJobSearch);

  return (
    <>
      <div className="flex items-center gap-4 ">
        <MagnifyingGlassIcon className="h-5 w-5" />
        <input
          type="text"
          className="bg-transparent "
          placeholder="Search exisiting jobs"
          onChange={(e) => {
            setJobSearch(e.target.value);
          }}
        />
      </div>
    </>
  );
}

// eslint-disable-next-line react/display-name
export const CustomSearchbar = forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
      />
    );
  }
);
