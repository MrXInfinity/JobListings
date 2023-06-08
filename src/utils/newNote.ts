"use server"

import { prisma } from "@/db";
import { Job } from "@prisma/client";
import moment from "moment";
import { revalidatePath } from "next/cache";

export type statusTypes = "APPLYING" | 
  "INTERVIEWING" | 
  "SENT_OFFER"|
  "CANCELLED"|
  "REJECTED" |
  "HIRED"

export type JobDataType = {
    title: string,
    dateOfApplication: any,
    description?: string,
    companyName: string,
    companyAddress?: string,
    link?: string,
    status: statusTypes
}

export default async function NewNote(data: JobDataType, name: string, email: string) {
    
    try {
    await prisma.job.create({
        data: {
            ...data,
            dateOfApplication: moment(data.dateOfApplication).toDate(),
            author: {
                connectOrCreate: {
                    where: {
                        email
                    },
                    create: {
                        email,
                        name
                    }
                    
                }
            }
        }
    })
        revalidatePath("/")
    } catch (err) {
        console.log(err)
    }
}