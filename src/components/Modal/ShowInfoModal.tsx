"use client";

import { FullDescJobType, getNote } from "@/utils/dbActions";
import useModalState from "@/utils/modalState";
import optionValues from "@/utils/optionValues";
import { BuildingOfficeIcon, LinkIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useEffect, useState } from "react";
import { momentConfig } from "../JobCard";
import Link from "next/link";

export default function ShowInfoModal() {
  const [jobInfo, setJobInfo] = useState<FullDescJobType>(
    {} as FullDescJobType
  );
  const jobID = useModalState((state) => state.modalID);

  useEffect(() => {
    if (jobID) {
      (async () => {
        const res = await getNote(jobID);
        setJobInfo(res!);
      })();
    }
  }, [jobID]);

  const {
    title,
    companyName,
    companyAddress,
    dateOfApplication,
    description,
    link,
    status,
  } = jobInfo;

  if (Object.keys(jobInfo).length <= 0) {
    return (
      <div className="flex w-full animate-pulse flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-40 bg-slate-400" />
          <div className="h-4 w-32 bg-slate-400" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-slate-400" />
          <div className="h-3 w-full bg-slate-400" />
          <div className="h-3 w-1/3 bg-slate-400" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="h-3 w-5 bg-slate-400" />
            <div className="h-3 w-28 bg-slate-400" />
          </div>
          <div className="flex gap-4">
            <div className="h-3 w-5 bg-slate-400" />
            <div className="h-3 w-28 bg-slate-400" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-slate-400" />
          <div className="h-3 w-16 bg-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-xl">{companyName}</h1>
        <h2 className="text-sm opacity-90">{title}</h2>
      </div>

      <p className="text-sm">{description ?? "..."}</p>

      <div className=" grid w-fit grid-rows-2 gap-3">
        <CustomLink
          link={
            companyAddress
              ? `https://maps.google.com/?q=${companyAddress}`
              : undefined
          }
        >
          <BuildingOfficeIcon className="h-4 w-4" />
          <p className="text-sm">{companyAddress ?? "..."}</p>
        </CustomLink>
        <CustomLink link={link ?? undefined}>
          <LinkIcon className="h-4 w-4" />
          <p className="text-sm">{link ? "Job Link" : "..."}</p>
        </CustomLink>
      </div>
      <div className="flex justify-between">
        <span
          className={`${
            status === "CANCELLED" || status === "REJECTED"
              ? `text-red-600`
              : `text-green-600`
          } font-bold`}
        >
          {optionValues[status]}
        </span>
        <p className="lowercase opacity-90">
          {moment(dateOfApplication).calendar(momentConfig)}
        </p>
      </div>
    </div>
  );
}

function CustomLink({
  children,
  link,
  ...props
}: {
  children: React.ReactNode;
  link?: string;
}) {
  if (link) {
    return (
      <a
        target="_blank"
        href={link.includes("https://") ? link : `https://${link}`}
        className="button_transition flex items-center gap-3 rounded-2xl bg-blue-400 px-4 py-1 font-normal text-white hover:bg-blue-500"
      >
        {children}
      </a>
    );
  }

  return (
    <div
      className="flex items-center gap-3 rounded-2xl bg-slate-200 px-4 py-1 dark:bg-zinc-800"
      {...props}
    >
      {children}
    </div>
  );
}
