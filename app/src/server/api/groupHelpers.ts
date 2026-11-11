import { TRPCError } from "@trpc/server";
import type { PrismaClient } from "generated/prisma";

export const getMembership = (db: PrismaClient, groupId: string, userId: string) =>
    db.groupMember.findUnique({ where: { groupId_userId: { groupId, userId } } });


export const requireMember = async (db: PrismaClient, groupId: string, userId: string) => {
    const membership = await getMembership(db, groupId, userId);
    if (!membership) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You are not a member of this group" });
    }
    return membership;
};


export const requireAdmin = async (db: PrismaClient, groupId: string, userId: string) => {
    const membership = await requireMember(db, groupId, userId);
    if (membership.role !== "ADMIN") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only group admins can do this" });
    }
    return membership;
};