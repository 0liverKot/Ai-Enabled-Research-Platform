import type { Prisma } from "generated/prisma";
import { EventEmitter } from "node:events";

export const messageSelect = {
    id: true,
    content: true,
    createdAt: true,
    channelId: true,
    author: { select: { id: true, name: true, image: true } }
} satisfies Prisma.MessageSelect

export type ChatMessage = Prisma.MessageGetPayload<{ select: typeof messageSelect }>

type Events = {
    message: [message: ChatMessage]
}

export const bus = new EventEmitter<Events>();
bus.setMaxListeners(0)