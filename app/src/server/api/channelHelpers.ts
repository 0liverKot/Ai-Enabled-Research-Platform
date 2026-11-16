import type { Prisma, PrismaClient } from "generated/prisma";

type Db = PrismaClient | Prisma.TransactionClient

export const createChannel = async (db: Db, groupId: string, name: string, main = false) => {
    await db.channel.create({ data: { groupId, name, main }});
}