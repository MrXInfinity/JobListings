"use client";

import { Job as JobType } from "@prisma/client";

export default function Card({ data }: { data: JobType }) {
  return (
    <div className="flex border-2 border-slate-900 dark:border-slate-100">
      {data.title}
    </div>
  );
}
