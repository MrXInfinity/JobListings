"use client";

import { signIn } from "next-auth/react";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

export function GoogleSignIn() {
  return (
    <ButtonWrapper signInType="google">
      <SiGoogle className="text-[#4285F4]" />
      <h1>SIgn In With Google</h1>
    </ButtonWrapper>
  );
}

export function GithubSignIn() {
  return (
    <ButtonWrapper signInType="github">
      <SiGithub className="text-[#181717] dark:text-white" />
      <h1>SIgn In With Github</h1>
    </ButtonWrapper>
  );
}

function ButtonWrapper({
  children,
  signInType,
}: {
  children: React.ReactNode;
  signInType: string;
}) {
  return (
    <button
      onClick={() => signIn(signInType, { callbackUrl: "/" })}
      className="button_transition flex justify-center gap-4 rounded-3xl border-2 border-slate-200 px-6 py-4 hover:border-blue-400 dark:border-zinc-800 dark:hover:border-blue-400"
    >
      {children}
    </button>
  );
}
