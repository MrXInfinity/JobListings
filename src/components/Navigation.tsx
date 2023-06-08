import NavComponents from "./NavComponentss";

export default function Navigation() {
  return (
    <div className="flex bg-slate-200 px-6 py-4 dark:bg-zinc-900 dark:text-white">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold">Job Listings</h1>
        <NavComponents />
      </div>
    </div>
  );
}
