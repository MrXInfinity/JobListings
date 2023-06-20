"use client";

import {
  JobType,
  getNote,
  newNote,
  statusTypes,
  updateNote,
} from "@/utils/dbActions";
import useModalState from "@/utils/modalState";
import optionValues from "@/utils/optionValues";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function SetInfoContent() {
  const methods = useForm<JobType>({
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

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = methods;

  const [isPending, startTransition] = useTransition();
  const [isOptionalOpen, setIsOptionalOpen] = useState(false);
  const jobID = useModalState((state) => state.modalID);
  const modalContent = useModalState((state) => state.modalContent);
  const closeModal = useModalState((state) => state.closeModal);
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

  const onSubmit = handleSubmit((data) => {
    const { companyAddress, description, link } = data;
    startTransition(() => {
      if (modalContent === "updateInfo") {
        const isSuccessful = updateNote(
          {
            ...data,
            companyAddress:
              isOptionalOpen && dirtyFields.companyAddress
                ? companyAddress
                : null,
            description:
              isOptionalOpen && dirtyFields.description ? description : null,
            link: isOptionalOpen && dirtyFields.link ? link : null,
          },
          jobID
        );
      } else {
        const isSuccessful = newNote(
          {
            ...data,
            companyAddress:
              isOptionalOpen && dirtyFields.companyAddress
                ? companyAddress
                : null,
            description:
              isOptionalOpen && dirtyFields.description ? description : null,
            link: isOptionalOpen && dirtyFields.link ? link : null,
          },
          session.data?.user?.name!,
          session.data?.user?.email!
        );
      }
      closeModal();
    });
  });

  useEffect(() => {
    if (jobID) {
      (async () => {
        const res = await getNote(jobID);
        const {
          title,
          dateOfApplication,
          description,
          companyName,
          companyAddress,
          link,
          status,
        } = res!;

        setValue("title", title);
        setValue(
          "dateOfApplication",
          moment(dateOfApplication).format("YYYY-MM-DD")
        );
        setValue("companyName", companyName);
        setValue("status", status);
        if (description) setValue("description", description);
        if (companyAddress) setValue("companyAddress", companyAddress);
        if (link) setValue("link", link);
      })();
    }
  }, [jobID]);

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="font-semibold lg:text-lg">
        {modalContent === "addInfo" && "Add "}
        {modalContent === "updateInfo" && "Update "}
        Job Application
      </h1>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <FormInputGroup
              data={requiredFormInputs}
              isRequired="This field is required"
            />
            <div className="flex flex-col">
              <div className="flex items-end justify-between">
                <label className="capitalize opacity-90">Status*</label>
                <p className="text-red-500">{errors?.status?.message}</p>
              </div>

              <select
                className="border-2 border-black bg-transparent p-2 outline-blue-400 dark:border-white"
                defaultValue="APPLYING"
                onChange={(e) =>
                  setValue("status", e.currentTarget.value as statusTypes)
                }
              >
                {Object.keys(optionValues).map((value, index) => (
                  <option
                    className="text-black"
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
                        delayChildren: 0.18,
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
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      open: { opacity: 1, y: 0 },
                    }}
                    className="flex flex-col"
                  >
                    <FormInputGroup data={optionalFormInputs} />
                  </motion.div>
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
            {isPending
              ? "Loading..."
              : modalContent === "updateInfo"
              ? "Update"
              : "Submit"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function FormInputGroup({
  data,
  isRequired,
}: {
  data: string[][];
  isRequired?: string;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const emailRegex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;

  if (!data) {
    return <></>;
  }

  return (
    <>
      {data.map(([value, label], index) => (
        <div
          className="flex flex-col"
          key={index}
        >
          <div className="flex items-end justify-between">
            <label className="capitalize opacity-90">
              {label}
              {isRequired && "*"}
            </label>
            <p className="text-sm text-red-500">
              {errors[value as keyof JobType]?.message as React.ReactNode}
            </p>
          </div>

          <input
            className="border-2 border-black bg-transparent p-2 outline-blue-400 dark:border-white"
            type={value === "dateOfApplication" ? "date" : "text"}
            required={isRequired !== undefined}
            {...register(value as any, {
              pattern:
                value === "link"
                  ? {
                      value: emailRegex,
                      message: "Value is not accepted as link",
                    }
                  : undefined,
              required: {
                value: isRequired !== undefined,
                message: isRequired ?? "",
              },
            })}
          />
        </div>
      ))}
    </>
  );
}
