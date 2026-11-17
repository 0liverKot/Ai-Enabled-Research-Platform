import { TRPCError } from "@trpc/server";
import type { Prisma, PrismaClient } from "generated/prisma";
import { requireMember } from "./groupHelpers";

type Db = PrismaClient | Prisma.TransactionClient

export const createChannel = async (db: Db, groupId: string, name: string, main = false) => {
    await db.channel.create({ data: { groupId, name, main }});
}

export const requireChannelMember = async (db: PrismaClient, channelId: string, userId: string) => {
    const channel = await db.channel.findUnique({ where: { id: channelId }, select: { id: true, groupId: true } });
    if (!channel) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Channel not found" });
    }

    await requireMember(db, channel.groupId, userId);
    return channel;
};
