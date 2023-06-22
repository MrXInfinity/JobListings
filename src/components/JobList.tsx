"use client";

import { useEffect, useState } from "react";
import Card from "./JobCard";
import useJobList from "@/utils/jobList";
import { Session } from "next-auth";
import { getAllNotes } from "@/utils/dbActions";

export default function JobList({ session }: { session: Session | null }) {
  const [data, setData] = useState<any[]>([]);
  const jobSearch = useJobList((state) => state.jobSearch);
  const jobStatus = useJobList((state) => state.jobStatus);

  useEffect(() => {
    if (session) {
      (async () => {
        const data = await getAllNotes(
          session?.user?.email!,
          jobSearch,
          jobStatus
        );
        setData(data!);
      })();
    }
  }, [jobSearch, jobStatus, session]);

  if (data.length === 0) {
    return (
      <div className="w-fit text-sm text-slate-600 dark:text-zinc-400">
        No Jobs Found...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
      {data.map((jobDesc, index) => (
        <Card
          data={jobDesc}
          key={index}
        />
      ))}
    </div>
  );
}
