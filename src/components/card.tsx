"use client";

import { perJob } from "@/app/page";

export default function Card({ data }: { data: perJob }) {
  return (
    <div className="flex border-2 border-slate-900 dark:border-slate-100">
      Jobs
    </div>
  );
}
