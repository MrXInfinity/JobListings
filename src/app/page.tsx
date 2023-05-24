import Card from "@/components/card";
import { prisma } from "@/db";
import Image from "next/image";

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

function getJobs() {
  prisma.job.findMany;
}
export default async function Home() {
  return <main className="dark:text-white dark:bg-zinc-800"></main>;
}
