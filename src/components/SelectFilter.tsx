"use client";

import { statusTypes } from "@/utils/dbActions";
import useJobList from "@/utils/jobList";
import optionValues from "@/utils/optionValues";
import { FunnelIcon } from "@heroicons/react/24/solid";

export default function SelectFilter() {
  const setJobStatus = useJobList((state) => state.setJobStatus);

  return (
    <div className="flex items-center gap-2">
      <FunnelIcon className="h-4 w-4 " />
      <select
        className=" bg-transparent p-2"
        defaultValue=""
        onChange={(e) => setJobStatus(e.currentTarget.value as statusTypes)}
      >
        <option
          className="dark:bg-zinc-900 "
          value=""
        >
          All Applications
        </option>
        {Object.keys(optionValues).map((value, index) => (
          <option
            className="dark:bg-zinc-900"
            value={value}
            key={index}
          >
            {optionValues[value as keyof typeof optionValues]}
          </option>
        ))}
      </select>
    </div>
  );
}
