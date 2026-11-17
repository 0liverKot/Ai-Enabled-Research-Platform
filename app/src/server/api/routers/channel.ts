import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { requireAdmin, requireMember } from "../groupHelpers";

export const channelRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().trim().min(1).max(50), groupId: z.string(), main: z.boolean()}))
        .mutation(async ({ ctx, input }) => {
            await requireAdmin(ctx.db, input.groupId, ctx.session.user.id)

            return ctx.db.channel.create({
                data: {
                    name: input.name,
                    groupId: input.groupId,
                    main: input.main
                }
            })
        }),

    mainChannel: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx, input }) => {
            await requireMember(ctx.db, input.groupId, ctx.session.user.id)

            return await ctx.db.channel.findFirst({
                where: { groupId: input.groupId, main: true },
                select: { 
                    id: true,
                    name: true
                } 
            })
       }),
    
    getChannel: protectedProcedure
       .input(z.object({ channelId: z.string(), groupId: z.string() }))
       .query(async ({ ctx, input }) => {
        await requireMember(ctx.db, input.groupId, ctx.session.user.id)

        return await ctx.db.channel.findFirst({
            where: { groupId: input.groupId, id: input.channelId},
            select: {
                id: true,
                name: true
            }
        })
       })

    
})