"use client";

import Card from "@/components/JobCard";
import Modal from "@/components/Modal/ModalComponent";
import { NewButton } from "@/components/Navigation/NavButtons";

import { statusTypes } from "@/utils/dbActions";
import useJobList from "@/utils/jobList";
import optionValues from "@/utils/optionValues";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// export const runtime = "edge";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const jobSearch = useJobList((state) => state.jobSearch);
  const jobStatus = useJobList((state) => state.jobStatus);
  const setJobStatus = useJobList((state) => state.setJobStatus);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  useEffect(() => {
    (async () => {
      const req = await fetch(
        `api/jobs?search=${jobSearch}&status=${jobStatus}`,
        { next: { tags: ["collection"] } }
      );
      const data = await req.json();
      setData(data);
    })();
  }, [jobSearch, jobStatus]);

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <main className=" flex w-full flex-col gap-6 p-6 dark:bg-zinc-800 dark:text-white sm:p-10 md:p-12 lg:p-16">
      <div className="flex items-end justify-between">
        <h1 className="text-lg">Your List of Jobs</h1>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 " />
          <select
            className=" bg-transparent p-2"
            defaultValue=""
            onChange={(e) => setJobStatus(e.currentTarget.value as statusTypes)}
          >
            <option
              className="dark:bg-zinc-800 "
              value=""
            >
              All Applications
            </option>
            {Object.keys(optionValues).map((value, index) => (
              <option
                className="dark:bg-zinc-800"
                value={value}
                key={index}
              >
                {optionValues[value as keyof typeof optionValues]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {data.map((jobDesc, index) => (
          <Card
            data={jobDesc}
            key={index}
          />
        ))}
      </div>
      <Modal />
      <div className="fixed bottom-4 right-4 flex sm:hidden">
        <NewButton />
      </div>
    </main>
  );
}
