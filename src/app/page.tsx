import Card from "@/components/card";
import { prisma } from "@/db";
import Image from "next/image";

export type perJob = {
  jobTitle: string;
  dateOfApplication: string;
  description?: string;
  companyName: string;
  companyAddress?: string;
  link?: string;
  status: string;
};

const jobList = [
  {
    jobTitle: "Web Developer",
    dateOfApplication: "May 5",
    description: "This company is beri good.",
    companyName: "Company 1",
    companyAddress: "Muntinlupa city",
    link: "",
    status: "applicationSent",
  },
  {
    jobTitle: "Junior Web Developer",
    dateOfApplication: "May 3",
    description: "This company is beri good.",
    companyName: "Company 2",
    status: "interviewPending",
  },
  {
    jobTitle: "Web Developer",
    dateOfApplication: "May 5",
    companyName: "Company 1",
    link: "",
    status: "applicationSent",
  },
];

export default async function Home() {
  return (
    <main className="flex flex-col gap-2 px-4 dark:text-white dark:bg-zinc-800">
      <h1>Your List of Jobs</h1>
      <ListOfJobs />
    </main>
  );
}

function ListOfJobs() {
  return (
    <>
      {jobList.map((jobDesc, index) => (
        <Card
          data={jobDesc}
          key={index}
        />
      ))}
    </>
  );
}
