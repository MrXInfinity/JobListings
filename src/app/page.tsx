import Modal from "@/components/ModalComponent";
import Card from "@/components/card";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "./api/auth/[...nextauth]/route";
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
    <main className=" flex w-full flex-col gap-2 p-4 px-4 dark:bg-zinc-800 dark:text-white">
      <h1>Your List of Jobs</h1>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-4">
        {data.map((jobDesc, index) => (
          <Card
            data={jobDesc}
            key={index}
          />
        ))}
      </div>
      <Modal />
    </main>
  );
}
