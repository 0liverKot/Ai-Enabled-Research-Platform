import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "generated/prisma";
import { getMembership, requireAdmin, requireMember } from "../groupHelpers";

export const groupRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().trim().min(1).max(50), description: z.string().trim().min(1).max(250).optional()}))
        .mutation(({ctx, input}) => 
            ctx.db.group.create({
                data: {
                    name: input.name,
                    description: input.description,
                    members: {create: {userId: ctx.session.user.id, role: "ADMIN"}},
                },
            })
        ),
    
    mine: protectedProcedure.query(({ ctx }) =>
        ctx.db.group.findMany({ where: { members: { some: { userId: ctx.session.user.id } } },
        }),
    ),

    members: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx, input }) => {
            await requireMember(ctx.db, input.groupId, ctx.session.user.id)
            return ctx.db.groupMember.findMany({
                where: { groupId: input.groupId },
                select: {
                    role: true,
                    user: { select: { id: true, name: true, image: true } }
                },
                orderBy: [{ role: "asc" }, { user: { name: "asc" } }]
            })
        }),

    invite: protectedProcedure
        .input(z.object({ inviteeId: z.string(), groupId: z.string(), message: z.string().trim().min(1).max(150).optional()}))
        .mutation(async ({ ctx, input }) => {
            await requireAdmin(ctx.db, input.groupId, ctx.session.user.id)
            
            if (await getMembership(ctx.db, input.groupId, input.inviteeId)) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "This user is already a member"})
            }

            try {
                return await ctx.db.groupInvitation.create({
                    data: {
                        inviterId: ctx.session.user.id,
                        inviteeId: input.inviteeId,
                        groupId: input.groupId,
                        message: input.message,
                    }
                })
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
                    throw new TRPCError({ code: "CONFLICT", message: "This user has already been invited"});
                }
                throw e
            }}
        ),
    
    accept: protectedProcedure
        .input(z.object({ inviteId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const invite = await ctx.db.groupInvitation.findFirst({
                where: { id: input.inviteId, inviteeId: ctx.session.user.id }
            })
            
            if (!invite) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Invitation not found" });
            }
            
            await ctx.db.$transaction([
                ctx.db.groupMember.upsert({
                    where: { groupId_userId: { groupId: invite.groupId, userId: ctx.session.user.id } },
                    create: { groupId: invite.groupId, userId: ctx.session.user.id },
                    update: {},
                }),
                ctx.db.groupInvitation.deleteMany({ where: { id: invite.id } })
            ])
            
            return { groupId: invite.groupId}
    }),

    reject: protectedProcedure
        .input(z.object({ inviteId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { count } = await ctx.db.groupInvitation.deleteMany({
                where: { id: input.inviteId, inviteeId: ctx.session.user.id }
            })

            if (count === 0) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Invitation not found"})
            }    
    }),

    myReceivedInvites: protectedProcedure.query(({ ctx }) => 
        ctx.db.groupInvitation.findMany({
            where: {inviteeId: ctx.session.user.id},
            select: {
                id: true,
                message: true,
                createdAt: true,
                group: { select: { id: true, name: true, _count: { select: {members: true } } } },
                inviter: { select: { id: true, name: true, image: true}}
            },
            orderBy: { createdAt: "desc"}
        })
    ),

    mySentInvites: protectedProcedure.query(({ ctx}) => 
        ctx.db.groupInvitation.findMany({
            where: {inviterId: ctx.session.user.id},
            select: {
                id: true,
                message: true, 
                createdAt: true,
                group: { select: { id: true, name: true } },
                invitee: { select: { id: true, name: true, image: true } }
            },
            orderBy: { createdAt: "desc" }
        })
    ),

})
