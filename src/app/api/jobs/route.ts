import { prisma } from "@/db"
import authOptions from "@/utils/authOptions"
import { Status } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("search")
    const status = searchParams.get("status")
    const session = await getServerSession(authOptions)

    const data = await prisma.job.findMany({
        where: {
            authorID: session?.user?.email!,
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
    })
    if (!data) return

    return NextResponse.json(data)
}