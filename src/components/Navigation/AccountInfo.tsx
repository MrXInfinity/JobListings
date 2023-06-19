"use client";

import { PowerIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { create } from "zustand";

const useRandomHex = create(() => {
  const codes = "0123456789ABCDEF";
  let randomHex = "";
  for (let i = 0; i < 6; i++) {
    randomHex += codes[Math.floor(Math.random() * codes.length)];
  }

  return {
    hex: `#${randomHex}`,
  };
});

export function AccountInfo() {
  const { data, status } = useSession();
  const hexCode = useRandomHex((state) => state.hex);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const profileClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeMenu = (e: any) => {
      if (e.target !== btnRef) {
        setIsMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeMenu);

    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, []);

  if (status === "authenticated") {
    return (
      <div className=" flex">
        <button
          ref={btnRef}
          type="button"
          style={{ backgroundColor: hexCode }}
          className=" flex rounded-full p-2"
          onClick={() => profileClick()}
        >
          {data?.user?.name?.split(" ")[0][0]}
          {data?.user?.name?.split(" ")[1][0]}
        </button>
        <div className="relative">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="hidden"
                animate="shown"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  shown: { opacity: 1, y: 0 },
                }}
                className="absolute right-0 top-14 flex cursor-pointer items-center gap-2 bg-white p-2 dark:text-black"
                onClick={() => signOut()}
              >
                <PowerIcon className="h-4 w-4" />
                <h1>logout</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return <></>;
}
