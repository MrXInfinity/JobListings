"use client";

import useModalState from "@/utils/modalState";
import NewNote, { JobDataType, statusTypes } from "@/utils/newNote";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
              className="relative flex w-full max-w-xl flex-col justify-center gap-4 bg-white  p-8 dark:bg-zinc-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-lg lg:text-xl">
                {modalContent === "addInfo" && "New Job Application"}
                {modalContent === "updateInfo" && "Update Job Application"}
                {modalContent === "displayInfo" && ""}
              </h1>
              <div
                className="absolute right-8 top-8 flex cursor-pointer"
                onClick={() => closeModal()}
              >
                <XMarkIcon className="h-6 w-6 " />
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
    watch,
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
  const session = useSession();

  const formInputs = [
    ["title", "Title"],
    ["dateOfApplication", "Application Date"],
    ["description", "Description"],
    ["companyName", "Company Name"],
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

  const isThisInputRequired = (val: string) =>
    val === "title" || val === "dateOfApplication" || val === "companyName";

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      NewNote(data, session.data?.user?.name!, session.data?.user?.email!);
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        {formInputs.map(([value, label], index) => (
          <div
            className="flex flex-col"
            key={index}
          >
            <div className="flex justify-between">
              <label className="capitalize opacity-90">
                {isThisInputRequired(value) ? `${label}*` : label}
              </label>

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
              className="border-2 border-black bg-transparent p-2 dark:border-white"
              required={isThisInputRequired(value)}
              {...register(value as any, {
                required: {
                  value: isThisInputRequired(value),
                  message: "This field is required!",
                },
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
            className="border-2 border-black bg-transparent p-2 dark:border-white"
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
      </div>
      <button
        className=" self-end bg-blue-400 px-6 py-3"
        disabled={isPending}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
