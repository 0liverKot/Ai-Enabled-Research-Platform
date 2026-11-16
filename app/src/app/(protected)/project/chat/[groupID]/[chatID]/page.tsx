type ChatRoomPageProps = {
    params: Promise<{ groupId: string; chatId: string }>
}

const ChatRoomPage = async ({ params }: ChatRoomPageProps) => {
    const { groupId, chatId } = await params

    return (
        <div>
            Chat {chatId} in group {groupId}
        </div>
    );
};

export default ChatRoomPage;
