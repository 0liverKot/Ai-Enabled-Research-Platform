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

    const channel = await api.channel.getChannel({ groupId: groupId, channelId: channelId})
    if (!channel) notFound()

    return (
        <div className="flex h-full w-full flex-col">
            <div className="border-b p-4">
                <span className="text-2xl">{`# ${channel.name}`}</span>
            </div>
            <ChatContainer user={{ id, name, image: image ?? null }} channelId={channelId}/>
        </div>
    );
};

export default ChatRoomPage;
