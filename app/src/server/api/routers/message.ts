import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { requireChannelMember } from "../channelHelpers";
import { bus, messageSelect, type ChatMessage } from "~/server/events";
import { tracked } from "@trpc/server";
import { on } from "events";

export const messageRouter = createTRPCRouter({
    list: protectedProcedure
        .input(z.object({
            channelId: z.string(),
            limit: z.number().int().min(1).max(100).default(50),
            cursor: z.string().nullish(),
        }))
        .query(async ({ ctx, input }) => {
            await requireChannelMember(ctx.db, input.channelId, ctx.session.user.id)

            const messages = await ctx.db.message.findMany({
                where: { channelId: input.channelId },
                // id as a tiebreaker so messages with the same createdAt keep a stable order across pages
                orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                // one extra row tells us whether there's another page without a second count query
                take: input.limit + 1,
                // start at the cursor row and skip it, since the client already has it
                cursor: input.cursor ? { id: input.cursor } : undefined,
                skip: input.cursor ? 1 : 0,
                select: messageSelect
            })

            let nextCursor: string | null = null
            if (messages.length > input.limit) {
                messages.pop()
                nextCursor = messages.at(-1)!.id
            }

            return {
                items: messages.reverse(),
                nextCursor,
            }
        }),

    send: protectedProcedure
        .input(z.object({ content: z.string().trim().min(1).max(4000), channelId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await requireChannelMember(ctx.db, input.channelId, ctx.session.user.id)
        
            const message = await ctx.db.message.create({
                data: {
                    content: input.content,
                    channelId: input.channelId,
                    authorId: ctx.session.user.id
                },
                select: messageSelect
            })

            bus.emit("message", message)
            return message
        }),

    onMessage: protectedProcedure
        .input(z.object({ channelId: z.string(), lastEventId: z.string().nullish() }))
        .subscription(async function* ({ ctx, input, signal }) {
            await requireChannelMember(ctx.db, input.channelId, ctx.session.user.id);

            // start listening before querying for missed messages
            const live = on(bus, "message", { signal }) as AsyncIterableIterator<[ChatMessage]>

            const sent = new Set<string>()

            if (input.lastEventId) {
                const last = await ctx.db.message.findFirst({
                    where: { id: input.lastEventId, channelId: input.channelId },
                    select: { id: true, createdAt: true },
                })

                if (last) {
                    const missed = await ctx.db.message.findMany({
                        where: {
                            channelId: input.channelId,
                            OR: [
                                { createdAt: { gt: last.createdAt } },
                                { createdAt: last.createdAt, id: { gt: last.id } },
                            ],
                        },
                        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
                        select: messageSelect,
                    })

                    for (const message of missed) {
                        sent.add(message.id)
                        yield tracked(message.id, message)
                    }
                }
            }

            for await (const [message] of live) {
                if (message.channelId !== input.channelId) continue
                if (sent.has(message.id)) continue
                yield tracked(message.id, message)
            }
        })
})
