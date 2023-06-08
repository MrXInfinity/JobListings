import Modal from "@/components/ModalComponent";
import Card from "@/components/card";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { JobDataType } from "@/utils/newNote";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const data = await prisma.job.findMany({
    where: {
      authorID: session?.user?.email as string,
    },
  });

  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col gap-2 px-4 dark:text-white dark:bg-zinc-800">
      <h1>Your List of Jobs</h1>

      {data.map((jobDesc, index) => (
        <Card
          data={jobDesc}
          key={index}
        />
      ))}
      <Modal />
    </main>
  );
}
