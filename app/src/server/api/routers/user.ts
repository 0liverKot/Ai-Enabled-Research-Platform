import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "generated/prisma";
import { requireAdmin } from "../groupHelpers";

export const userRouter = createTRPCRouter({
    
    // gets all users not in group, will adjust work with searching specific users in future
    notInGroup: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx, input }) => {
            await requireAdmin(ctx.db, input.groupId, ctx.session.user.id)
            
            return ctx.db.user.findMany({
                where: {
                    memberships: { none: {groupId: input.groupId } },
                    invitationsReceived: { none: { groupId: input.groupId } },
                },
                select: { id: true, name: true, image: true },
                orderBy: { name: "asc" },
            })
        })
})