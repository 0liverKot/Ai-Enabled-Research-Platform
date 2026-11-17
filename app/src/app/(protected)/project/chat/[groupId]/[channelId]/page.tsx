import { TRPCError } from "@trpc/server";
import { notFound, redirect } from "next/navigation";
import ChatContainer from "~/app/_components/project/chat/ChatContainer";
import { getSession } from "~/server/better-auth/server";
import { api } from "~/trpc/server";

type ChatRoomPageProps = {
    params: Promise<{ groupId: string; channelId: string }>
}

const ChatRoomPage = async ({ params }: ChatRoomPageProps) => {
    const { groupId, channelId } = await params

    // (protected)/layout.tsx already redirects signed-out users, this just narrows the type
    const session = await getSession()
    if (!session) redirect("/auth/sign-in")
    const { id, name, image } = session.user

    let channel
    try {
        channel = await api.channel.getChannel({ groupId: groupId, channelId: channelId})
    } catch (error) {
        // requireChannelMember throws NOT_FOUND for missing channels and other people's DMs
        if (error instanceof TRPCError && error.code === "NOT_FOUND") notFound()
        throw error
    }
    if (!channel) notFound()

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex items-center gap-3 border-b p-4">
                {channel.otherUser ? (
                    <>
                        <img
                            src={channel.otherUser.image ?? "/images/user.png"}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-2xl">{channel.otherUser.name}</span>
                    </>
                ) : (
                    <span className="text-2xl">{`# ${channel.name}`}</span>
                )}
            </div>
            <ChatContainer user={{ id, name, image: image ?? null }} channelId={channelId}/>
        </div>
    );
};

export default ChatRoomPage;
