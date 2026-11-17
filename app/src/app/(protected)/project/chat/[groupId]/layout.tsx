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

    // fetched here so every page in the group gets the membership check, not just the sidebar
    let data;
    try {
        data = await Promise.all([
            api.group.get({ groupId }),
            api.channel.list({ groupId }),
            api.group.members({ groupId }),
        ]);
    } catch (error) {
        // not a member (or the group doesn't exist)
        if (error instanceof TRPCError && error.code === "FORBIDDEN") notFound();
        throw error;
    }

    const [group, channels, members] = data;
    if (!group) notFound();

    // DMs are with everyone else in the group
    const otherMembers = members
        .map((member) => member.user)
        .filter((user) => user.id !== session.user.id);

    return (
        <div className="flex h-full">
            <ChatSideBar group={group} channels={channels} members={otherMembers} />
            <section className="min-w-0 flex-1">{children}</section>
        </div>
    );
};

export default ChatGroupLayout;
