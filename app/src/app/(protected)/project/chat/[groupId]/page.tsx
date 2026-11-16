import { TRPCError } from "@trpc/server"
import { notFound, redirect } from "next/navigation"
import { api } from "~/trpc/server"

type ChatGroupPageProps = {
    params: Promise<{ groupId: string }>
}

// /project/chat/[groupId] has no content of its own, forwards to the group's main channel
const ChatGroupPage = async ({ params }: ChatGroupPageProps) => {
    const { groupId } = await params

    let mainChannel
    try {
        mainChannel = await api.channel.mainChannel({ groupId })
    } catch (error) {
        if (error instanceof TRPCError && error.code === "FORBIDDEN") notFound()
        throw error
    }

    if (!mainChannel) notFound()

    redirect(`/project/chat/${groupId}/${mainChannel.id}`)
}

export default ChatGroupPage
