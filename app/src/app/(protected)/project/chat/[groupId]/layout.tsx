import { TRPCError } from "@trpc/server";
import { notFound, redirect } from "next/navigation";
import ChatSideBar from "~/app/_components/project/chat/ChatSideBar";
import { getSession } from "~/server/better-auth/server";
import { api } from "~/trpc/server";

type ChatGroupLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ groupId: string }>;
};

const ChatGroupLayout = async ({ children, params }: ChatGroupLayoutProps) => {
    const { groupId } = await params;

    const session = await getSession();
    if (!session) redirect("/auth/sign-in");

    let data;
    try {
        data = await Promise.all([
            api.group.get({ groupId }),
            api.channel.list({ groupId }),
            api.channel.dms({ groupId }),
        ]);
    } catch (error) {
        if (error instanceof TRPCError && error.code === "FORBIDDEN") notFound();
        throw error;
    }

    const [group, channels, dms] = data;
    if (!group) notFound();

    return (
        <div className="flex h-full">
            <ChatSideBar group={group} channels={channels} dms={dms} />
            <section className="min-w-0 flex-1">{children}</section>
        </div>
    );
};

export default ChatGroupLayout;
