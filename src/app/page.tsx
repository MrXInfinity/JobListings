import JobList from "@/components/JobList";
import Modal from "@/components/Modal/ModalComponent";
import { NewButton } from "@/components/Navigation/NavButtons";
import SelectFilter from "@/components/SelectFilter";
import authOptions from "@/utils/authOptions";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// export const runtime = "edge";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className=" flex w-full flex-col gap-6 p-6 dark:bg-zinc-900 dark:text-white sm:p-10 md:p-12 lg:p-16">
      <div className="flex items-end justify-between">
        <h1 className="text-lg">Your List of Jobs</h1>
        <SelectFilter />
      </div>

      <JobList session={session} />
      <Modal />
      <div className="fixed bottom-4 right-4 flex sm:hidden">
        <NewButton />
      </div>
    </main>
  );
}
