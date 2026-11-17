import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { requireAdmin, requireMember } from "../groupHelpers";
import { requireChannelMember } from "../channelHelpers";

export const channelRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().trim().min(1).max(50), groupId: z.string(), main: z.boolean(), isDM: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            await requireAdmin(ctx.db, input.groupId, ctx.session.user.id)

            return ctx.db.channel.create({
                data: {
                    name: input.name,
                    groupId: input.groupId,
                    main: input.main,
                    isDM: input.isDM
                }
            })
        }),

    list: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx, input }) => {
            await requireMember(ctx.db, input.groupId, ctx.session.user.id)

            return ctx.db.channel.findMany({
                where: { groupId: input.groupId, isDM: false },
                select: { id: true, name: true, main: true },
                // main channel first, then alphabetical
                orderBy: [{ main: "desc" }, { name: "asc" }],
            })
        }),

    dms: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx, input }) => {
            const me = ctx.session.user.id
            await requireMember(ctx.db, input.groupId, me)

            const userSelect = { select: { id: true, name: true, image: true } }
            const stillMember = { memberships: { some: { groupId: input.groupId } } }

            const channels = await ctx.db.channel.findMany({
                where: {
                    groupId: input.groupId,
                    isDM: true,
                    OR: [{ userOneId: me }, { userTwoId: me }],
                    userOne: stillMember,
                    userTwo: stillMember,
                },
                select: { id: true, userOne: userSelect, userTwo: userSelect },
            })

            return channels
                .flatMap(({ id, userOne, userTwo }) => {
                    if (!userOne || !userTwo) return []
                    return [{ id, otherUser: userOne.id === me ? userTwo : userOne }]
                })
                .sort((a, b) => a.otherUser.name.localeCompare(b.otherUser.name))
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
        await requireChannelMember(ctx.db, input.channelId, ctx.session.user.id)

        const channel = await ctx.db.channel.findFirst({
            where: { groupId: input.groupId, id: input.channelId},
            select: {
                id: true,
                name: true,
                isDM: true,
                userOne: { select: { id: true, name: true, image: true } },
                userTwo: { select: { id: true, name: true, image: true } },
            }
        })
        if (!channel) return null

        // for DMs, the person on the other end (so the page can show their name instead of "dm")
        const { userOne, userTwo, ...rest } = channel
        const otherUser = channel.isDM
            ? (userOne?.id === ctx.session.user.id ? userTwo : userOne)
            : null

        return { ...rest, otherUser }
       })

    
})