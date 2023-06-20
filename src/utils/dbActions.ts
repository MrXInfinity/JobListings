"use server"

import { prisma } from "@/db";
import { Job, Status } from "@prisma/client";
import moment from "moment";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import authOptions from "./authOptions";

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

export async function getAllNotes(email: string, query?: string, status?: string) {
    try {
        const data = await prisma.job.findMany({
            where: {
                authorID: email,
                AND: {
                    OR: [{ title: { startsWith: query ?? "" } }, { companyName: { startsWith: query ?? "" } }],
                    status: status ? status as Status : undefined
                }
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

    const { title, status, companyName, dateOfApplication } = data

    if (!title || !status || !companyName || !dateOfApplication) return false
    try {
        const res = await prisma.job.create({
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
        if (!res) return false
        return true
    } catch (err) {
        console.log(err)
        return false
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
        return true
    } catch (err) {
        console.log(err)
        return false
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