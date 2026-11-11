import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const groupRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().trim().min(1).max(50)}))
        .mutation(({ctx, input}) => 
            ctx.db.group.create({
                data: {
                    name: input.name,
                    members: {create: {userId: ctx.session.user.id, role: "ADMIN"}},
                },
            })
        ),
    
    mine: protectedProcedure.query(({ ctx }) =>
        ctx.db.group.findMany({ where: { members: { some: { userId: ctx.session.user.id } } },
        }),
    ),
    
})