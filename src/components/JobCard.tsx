"use client";

import { deleteNote } from "@/utils/dbActions";
import useModalState from "@/utils/modalState";
import optionValues from "@/utils/optionValues";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Job as JobType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export const momentConfig = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD-MM-YY",
};

export default function Card({
  data,
}: {
  data: Pick<
    JobType,
    "id" | "title" | "companyName" | "dateOfApplication" | "status"
  >;
}) {
  const toggleModal = useModalState((state) => state.openModal);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const btnRef = useRef(null);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openModal = (id: string) => {
    toggleModal("displayInfo", id);
  };

  const updateClick = (id: string) => {
    toggleModal("updateInfo", id);
  };

  const deleteClick = (id: string) => {
    deleteNote(id);
  };

  useEffect(() => {
    const closeMenu = (e: any) => {
      if (e.target !== btnRef.current) {
        setIsMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeMenu);

    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, []);

  if (Object.keys(data).length <= 0) {
    return <></>;
  }

  const { id, title, companyName, dateOfApplication, status } = data;

  return (
    <div
      className="flex cursor-pointer flex-col gap-5 rounded-3xl border-2 border-slate-200 px-6 py-4 dark:border-slate-100"
      onClick={() => {
        openModal(id);
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl">{companyName}</h1>
          <h2 className="text-sm opacity-90">{title}</h2>
        </div>

        <div className="relative">
          <div className="absolute right-0 top-0">
            <EllipsisHorizontalIcon
              ref={btnRef}
              className="button_transition h-6 w-6 p-0 hover:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                openMenu();
              }}
            />
            <div className="relative">
              <AnimatePresence initial={false}>
                {isMenuOpen && (
                  <motion.div
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, x: 5, y: -5 },
                      shown: { opacity: 1, x: 0, y: 0 },
                    }}
                    className="absolute right-0 top-0 z-10 flex w-20 flex-col border-2 border-slate-100 bg-white"
                  >
                    <button
                      className="px-3 py-2 text-left"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();

                        updateClick(id);
                        closeMenu();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 text-left"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClick(id);
                        closeMenu();
                      }}
                    >
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <span
          className={`${
            status === "CANCELLED" || status === "REJECTED"
              ? `text-red-600`
              : `text-green-600`
          } font-bold`}
        >
          {optionValues[status]}
        </span>
        <p className="lowercase opacity-90">
          {moment(dateOfApplication).calendar(momentConfig)}
        </p>
      </div>
    </div>
  );
}
