import type { IncomingHttpHeaders } from "node:http";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { appRouter } from "./api/root";
import { createTRPCContext } from "./api/trpc";

// Node gives the upgrade request's headers as a plain object, but createTRPCContext and Better Auth's getSession expect a web Headers instance
const toHeaders = (incoming: IncomingHttpHeaders): Headers => {
    const headers = new Headers();

    for (const [key, value] of Object.entries(incoming)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
            for (const item of value) headers.append(key, item);
        } else {
            headers.append(key, value);
        }
    }

    return headers;
};

const wss = new WebSocketServer({ port: 3001 });

const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: ({ req }) => createTRPCContext({ headers: toHeaders(req.headers) }),
    keepAlive: { enabled: true, pingMs: 30_000, pongWaitMs: 5_000}
})

process.on("SIGTERM", () => {
    handler.broadcastReconnectNotification();
    wss.close()
})