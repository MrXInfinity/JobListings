"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex justify-center gap-4"
    >
      <SiGoogle className="text-[#4285F4]" />
      <h1>SIgn In With Google</h1>
    </button>
  );
}
