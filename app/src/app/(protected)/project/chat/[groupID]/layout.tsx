import ChatSideBar from "~/app/_components/project/chat/ChatSideBar";

type ChatGroupLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ groupId: string }>;
};

const ChatGroupLayout = async ({ children, params }: ChatGroupLayoutProps) => {
    const { groupId } = await params;

    return (
        <div className="flex h-full">
            <ChatSideBar groupId={groupId} />
            <section className="min-w-0 flex-1">{children}</section>
        </div>
    );
};

export default ChatGroupLayout