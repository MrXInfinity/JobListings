"use server"

import { prisma } from "@/db";
import { Job } from "@prisma/client";
import moment from "moment";
import { revalidatePath } from "next/cache";

export type statusTypes = "APPLYING" |
    "INTERVIEWING" |
    "SENT_OFFER" |
    "CANCELLED" |
    "REJECTED" |
    "HIRED"

export type JobType = {
    title: string,
    dateOfApplication: string | Date,
    status: statusTypes
    companyName: string,
    description: string | null,
    companyAddress: string | null,
    link: string | null,

}

export type FullDescJobType = Omit<
    Job,
    "authorID" | "updatedAt" | "createdAt"
>;

export async function getAllNotes(email: string, query?: string) {
    try {
        const data = await prisma.job.findMany({
            where: {
                authorID: email,
                OR: [{ title: { startsWith: query } }, { companyName: { startsWith: query } }],
            },
            select: {
                id: true,
                title: true,
                companyName: true,
                dateOfApplication: true,
                status: true,
            },
        });
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function newNote(data: JobType, name: string, email: string) {

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

export async function getNote(id: string) {
    try {
        const result = await prisma.job.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                companyName: true,
                dateOfApplication: true,
                status: true,
                description: true,
                link: true,
                companyAddress: true
            }
        })
        return result

    } catch (err) {
        console.log(err)
    }
}

export async function updateNote(data: JobType, id: string) {
    try {
        await prisma.job.update({
            where: {
                id
            },
            data: {
                ...data,
                dateOfApplication: moment(data.dateOfApplication).toDate()

            }
        })
        revalidatePath("/")
    } catch (err) {
        console.log(err)
    }
}

export async function deleteNote(id: string) {
    try {
        await prisma.job.delete({
            where: {
                id
            }
        })
        revalidatePath("/")
    } catch (err) {
        console.log(err)
    }
}