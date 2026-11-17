import { TRPCError } from "@trpc/server";
import type { Prisma, PrismaClient } from "generated/prisma";
import { requireMember } from "./groupHelpers";

type Db = PrismaClient | Prisma.TransactionClient

export const createChannel = async (db: Db, groupId: string, name: string, main = false, isDM = false) => {
    await db.channel.create({
         data: { groupId, name, main, isDM } });
}

export const createDM = (db: Db, groupId: string, userA: string, userB: string) => {
    if (userA === userB) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Can't DM yourself" });
    }

    const [userOneId, userTwoId]: [string, string] = userA < userB ? [userA, userB] : [userB, userA]

    return db.channel.upsert({
        where: { groupId_userOneId_userTwoId: { groupId, userOneId, userTwoId } },
        update: {},
        create: { groupId, name: "dm", isDM: true, userOneId, userTwoId}
    })
}

export const requireChannelMember = async (db: PrismaClient, channelId: string, userId: string) => {
    const channel = await db.channel.findUnique({
        where: { id: channelId },
        select: { id: true, groupId: true, isDM: true, userOneId: true, userTwoId: true },
    });
    if (!channel) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Channel not found" });
    }

    // still checked for DMs, so someone who leaves the group loses access to its DMs too
    await requireMember(db, channel.groupId, userId);

    if (channel.isDM && userId !== channel.userOneId && userId !== channel.userTwoId) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Channel not found" });
    }

    return channel;
};
