"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="button_transition flex justify-center gap-4 rounded-3xl border-2 border-slate-200 px-6 py-4 hover:border-blue-400 dark:border-zinc-800 dark:hover:border-blue-400"
    >
      <SiGoogle className="text-[#4285F4]" />
      <h1>SIgn In With Google</h1>
    </button>
  );
}
