import GoogleSignInButton from "@/components/GoogleSigninButton";

export default function SignIn() {
  return (
    <section className="flex justify-center px-10 py-8 ">
      <div className="flex flex-col">
        <h1>Sign In</h1>
        <GoogleSignInButton />
      </div>
    </section>
  );
}
