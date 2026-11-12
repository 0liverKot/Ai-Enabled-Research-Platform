// Dev-only seed: creates a second user, a group they admin, and an invite to you.
// Safe to re-run: every step upserts, nothing is deleted.
//
// Usage (from app/):
//   node --env-file=.env prisma/seed-dev.mjs <your-account-email>
//
// The demo user can sign in with:
//   demo.inviter@example.com / password123

import { hashPassword } from "better-auth/crypto";
import { PrismaClient } from "../generated/prisma/index.js";

const DEMO_EMAIL = "demo.inviter@example.com";
const DEMO_PASSWORD = "password123";
const DEMO_USER_ID = "demo-inviter";
const DEMO_GROUP_ID = "demo-research-group2";

const inviteeEmail = process.argv[2];
if (!inviteeEmail) {
    console.error("Usage: node --env-file=.env prisma/seed-dev.mjs <your-account-email>");
    process.exit(1);
}

const db = new PrismaClient();

try {
    const invitee = await db.user.findUnique({ where: { email: inviteeEmail } });
    if (!invitee) {
        throw new Error(`No user with email ${inviteeEmail}. Sign up with it first.`);
    }

    // 1. Demo user + credential account (same shape Better Auth creates on sign-up)
    const inviter = await db.user.upsert({
        where: { email: DEMO_EMAIL },
        update: {},
        create: {
            id: DEMO_USER_ID,
            name: "Demo Inviter",
            email: DEMO_EMAIL,
            emailVerified: true,
        },
    });

    const existingAccount = await db.account.findFirst({
        where: { userId: inviter.id, providerId: "credential" },
    });
    if (!existingAccount) {
        await db.account.create({
            data: {
                id: `${inviter.id}-credential`,
                accountId: inviter.id,
                providerId: "credential",
                userId: inviter.id,
                password: await hashPassword(DEMO_PASSWORD),
            },
        });
    }

    // 2. Group with the demo user as admin
    const group = await db.group.upsert({
        where: { id: DEMO_GROUP_ID },
        update: {},
        create: {
            id: DEMO_GROUP_ID,
            name: "Demo Research Group 2",
            members: { create: { userId: inviter.id, role: "ADMIN" } },
        },
    });

    // 3. Invite to you (skipped if you're already a member)
    const alreadyMember = await db.groupMember.findUnique({
        where: { groupId_userId: { groupId: group.id, userId: invitee.id } },
    });

    if (alreadyMember) {
        console.log(`${inviteeEmail} is already in "${group.name}"; no invite created.`);
    } else {
        await db.groupInvitation.upsert({
            where: { groupId_inviteeId: { groupId: group.id, inviteeId: invitee.id } },
            update: {},
            create: {
                groupId: group.id,
                inviterId: inviter.id,
                inviteeId: invitee.id,
                message: "Hey! Want to help out with our research project?",
            },
        });
        console.log(`Invite from "${inviter.name}" to ${inviteeEmail} for "${group.name}" is ready.`);
    }
} finally {
    await db.$disconnect();
}
