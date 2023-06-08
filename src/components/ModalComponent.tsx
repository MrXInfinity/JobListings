"use client";

import useModalState from "@/utils/modalState";
import NewNote, { JobDataType, statusTypes } from "@/utils/newNote";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Modal() {
  const { isModalOpen, modalContent, closeModal } = useModalState();

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 p-8"
            onClick={(e) => {
              if (e.currentTarget === e.target) closeModal();
            }}
          >
            <motion.div
              layout
              className="relative flex w-full max-w-xl flex-col justify-center gap-2 bg-white px-8 py-6 dark:bg-zinc-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="font-semibold lg:text-lg">
                {modalContent === "addInfo" && "New Job Application"}
                {modalContent === "updateInfo" && "Update Job Application"}
                {modalContent === "displayInfo" && ""}
              </h1>
              <div
                className="absolute right-8 top-8 flex cursor-pointer"
                onClick={() => closeModal()}
              >
                <XMarkIcon className="button_transition h-6 w-6 p-0 hover:text-blue-400" />
              </div>

              {modalContent === "updateInfo" ||
                (modalContent === "addInfo" && <SetInfoContent />)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SetInfoContent() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<JobDataType>({
    defaultValues: {
      title: "",
      dateOfApplication: moment().toDate(),
      description: "",
      companyName: "",
      companyAddress: "",
      link: "",
      status: "APPLYING",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [isOptionalOpen, setIsOptionalOpen] = useState(false);
  const session = useSession();

  const requiredFormInputs = [
    ["title", "Title"],
    ["dateOfApplication", "Application Date"],
    ["companyName", "Company Name"],
  ];

  const optionalFormInputs = [
    ["description", "Description"],
    ["companyAddress", "Company Address"],
    ["link", "Link"],
  ];

  const optionValues = {
    APPLYING: "Application Sent",
    INTERVIEWING: "Interviewing Process",
    SENT_OFFER: "Received Job Offer",
    CANCELLED: "Application Cancelled",
    REJECTED: "Application Rejected",
    HIRED: "Accepted the Position",
  };

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      if (isOptionalOpen) {
        NewNote(data, session.data?.user?.name!, session.data?.user?.email!);
      } else {
        const { title, companyName, dateOfApplication, status } = data;
        NewNote(
          {
            title,
            companyName,
            dateOfApplication,
            status,
          },
          session.data?.user?.name!,
          session.data?.user?.email!
        );
      }
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2">
        {requiredFormInputs.map(([value, label], index) => (
          <div
            className="flex flex-col"
            key={index}
          >
            <div className="flex justify-between">
              <label className="capitalize opacity-90">{label}*</label>
              {errors[value as keyof JobDataType] && (
                <p className="text-red-500">
                  {
                    errors[value as keyof JobDataType]
                      ?.message as React.ReactNode
                  }
                </p>
              )}
            </div>
            <input
              type={value === "dateOfApplication" ? "date" : "text"}
              className="border-2 border-black bg-transparent p-2 outline-blue-400 dark:border-white"
              required
              {...register(value as any, {
                required: "This field is required!",
              })}
            />
          </div>
        ))}
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label className="capitalize opacity-90">Status*</label>

            {errors.status && (
              <p className="text-red-500">{errors?.status?.message}</p>
            )}
          </div>

          <select
            className="border-2 border-black bg-transparent p-2 outline-blue-400 dark:border-white"
            onChange={(e) =>
              setValue("status", e.currentTarget.value as statusTypes)
            }
          >
            {Object.keys(optionValues).map((value, index) => (
              <option
                className="text-black"
                selected={index === 0}
                value={value}
                key={index}
              >
                {optionValues[value as keyof typeof optionValues]}
              </option>
            ))}
          </select>
        </div>
        <AnimatePresence initial={false}>
          {isOptionalOpen && (
            <motion.div
              className="flex flex-col gap-2"
              initial="hidden"
              animate="open"
              exit="hidden"
              variants={{
                open: {
                  height: "auto",
                  transition: {
                    delayChildren: 0.15,
                  },
                },
                hidden: {
                  height: 0,
                  transition: {
                    delay: 0.15,
                  },
                },
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              {optionalFormInputs.map(([value, label], index) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    open: { opacity: 1, y: 0 },
                  }}
                  className="flex flex-col"
                  key={index}
                >
                  <div className="flex justify-between">
                    <label className="capitalize opacity-90">{label}</label>
                    {errors[value as keyof JobDataType] && (
                      <p className="text-red-500">
                        {
                          errors[value as keyof JobDataType]
                            ?.message as React.ReactNode
                        }
                      </p>
                    )}
                  </div>

                  <input
                    className="border-2 border-black bg-transparent p-2 outline-blue-400 dark:border-white"
                    {...register(value as any)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          className="flex"
          onClick={() => setIsOptionalOpen((bool) => !bool)}
        >
          {isOptionalOpen ? (
            <div className="flex items-center gap-4">
              <ChevronUpIcon className="h-5 w-5" />
              <h1 className="text-sm">Hide Optional Info</h1>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ChevronDownIcon className="h-5 w-5" />
              <h1 className="text-sm">Show Optional Info</h1>
            </div>
          )}
        </button>
      </div>
      <button
        className=" button_transition self-end bg-blue-400 text-white enabled:hover:bg-blue-500 disabled:bg-blue-200"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
