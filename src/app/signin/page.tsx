import GoogleSignInButton from "@/components/GoogleSigninButton";

export default function SignIn() {
  return (
    <section className="flex w-full justify-center px-10 py-8 ">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-xl font-medium">Sign In</h1>
        <div className="flex flex-col rounded-3xl border-2 border-slate-200 px-6 py-4 dark:border-slate-100">
          <GoogleSignInButton />
        </div>
      </div>
    </section>
  );
}
