"use client";

import useModalState from "@/utils/modalState";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import SetInfoContent from "./SetInfoContent";
import ShowInfoModal from "./ShowInfoModal";

export default function Modal() {
  const { isModalOpen, modalContent, closeModal, openModal, modalID } =
    useModalState();

  const editInfo = () => {
    openModal("updateInfo", modalID);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={{
              hidden: {
                opacity: 0,
                transition: {
                  delayChildren: 0.15,
                },
              },
              shown: {
                opacity: 1,
              },
            }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 p-8"
            onClick={(e) => {
              if (e.currentTarget === e.target) closeModal();
            }}
          >
            <motion.div
              layout
              className="relative flex w-full max-w-xl flex-col justify-center gap-3 rounded-3xl bg-white px-8 py-6 dark:bg-zinc-800"
              variants={{ shown: { opacity: 1 }, hidden: { opacity: 0 } }}
            >
              <div className=" relative flex">
                <div
                  className="absolute right-0 top-0 flex cursor-pointer items-center gap-4"
                  onClick={() => closeModal()}
                >
                  {modalContent === "displayInfo" && (
                    <PencilIcon
                      className="button_transition h-4 w-4 p-0 hover:text-blue-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        editInfo();
                      }}
                    />
                  )}
                  <XMarkIcon
                    className="button_transition h-6 w-6 p-0 hover:text-blue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                  />
                </div>
                {(modalContent === "updateInfo" ||
                  modalContent === "addInfo") && <SetInfoContent />}
                {modalContent === "displayInfo" && <ShowInfoModal />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
