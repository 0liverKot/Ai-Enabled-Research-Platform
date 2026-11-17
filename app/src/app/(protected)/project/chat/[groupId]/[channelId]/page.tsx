import { notFound } from "next/navigation";
import ChatContainer from "~/app/_components/project/chat/ChatContainer";
import { api } from "~/trpc/server";

type ChatRoomPageProps = {
    params: Promise<{ groupId: string; channelId: string }>
}

const ChatRoomPage = async ({ params }: ChatRoomPageProps) => {
    const { groupId, channelId } = await params

    const channel = await api.channel.getChannel({ groupId: groupId, channelId: channelId})
    if (!channel) notFound()

    return (
        <div className="flex h-full w-full flex-col">
            <div className="border-b p-4">
                <span className="text-2xl">{channel.name}</span>
            </div>
            <ChatContainer/>
        </div>
    );
};

export default ChatRoomPage;
