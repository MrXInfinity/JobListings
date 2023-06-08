import NavComponents from "./NavComponents";

export default function Nav() {
  return (
    <div className="flex bg-slate-200 dark:bg-zinc-900 dark:text-white px-6 py-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-bold">Job Listings</h1>
        <NavComponents />
      </div>
    </div>
  );
}
