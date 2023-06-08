"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  // const loggingIn = async () => {
  //   const {}signIn("google", { callbackUrl: "/" });
  // }
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex justify-center"
    >
      <h1>SIgn In With Google</h1>
    </button>
  );
}
