type ChatRoomPageProps = {
    params: Promise<{ groupId: string; channelId: string }>
}

const ChatRoomPage = async ({ params }: ChatRoomPageProps) => {
    const { groupId, channelId } = await params

    return (
        <div>
            Chat {channelId} in group {groupId}
        </div>
    );
};

export default ChatRoomPage;
