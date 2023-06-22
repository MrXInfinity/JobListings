import { GithubSignIn, GoogleSignIn } from "@/components/SigninButtons";

export default function SignIn() {
  return (
    <section className="flex w-full justify-center px-10 py-8 dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-8 dark:text-white">
        <h1 className="text-xl font-medium">Sign In</h1>
        <div className="flex flex-col gap-4">
          <GoogleSignIn />
          <GithubSignIn />
        </div>
      </div>
    </section>
  );
}
