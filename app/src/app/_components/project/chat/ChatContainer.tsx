"use client"

import type { User } from "generated/prisma"
import InputMessage from "./InputMessage"
import { useLayoutEffect, useMemo, useRef } from "react"
import MessageRow from "./MessageRow"
import { api, type RouterOutputs } from "~/trpc/react"

// how close (px) to the bottom still counts as "at the bottom"
const NEAR_BOTTOM_PX = 80
const PAGE_SIZE = 50

export type ChatUser = Pick<User, "id" | "name" | "image">
export type ChatMessage = RouterOutputs["message"]["list"]["items"][number]

type ChatContainerProps = {
    user: ChatUser
    channelId: string
}

const ChatContainer = ({user, channelId}: ChatContainerProps) => {
    const listInput = { channelId, limit: PAGE_SIZE }
    
    const history = api.message.list.useInfiniteQuery(listInput, {
        getNextPageParam: (last) => last.nextCursor,
    })

    const messages = useMemo(
        // copy before reverse(), which mutates and would corrupt the query cache
        () => [...(history.data?.pages ?? [])].reverse().flatMap((page) => page.items),
        [history.data],
    )

    const utils = api.useUtils()

    const addToNewestPage = (message: ChatMessage) => {
        utils.message.list.setInfiniteData(listInput, (old) => {
            if (!old) return old
            const [newest, ...rest] = old.pages
            if (!newest || newest.items.some((m) => m.id === message.id)) return old
            return { ...old, pages: [{ ...newest, items: [...newest.items, message] }, ...rest] }
        })
    }

    const send = api.message.send.useMutation({ onSuccess: addToNewestPage })

    api.message.onMessage.useSubscription({ channelId }, {
        onData: ({ data }) => addToNewestPage(data),
    })

    const scrollRef = useRef<HTMLDivElement>(null)
    const isNearBottomRef = useRef(true)
    const hasScrolledInitiallyRef = useRef(false)
    const distanceFromBottomRef = useRef<number | null>(null)

    const handleScroll = () => {
        const el = scrollRef.current
        if (!el) return
        isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX
    }

    const loadOlder = () => {
        const el = scrollRef.current
        if (el) distanceFromBottomRef.current = el.scrollHeight - el.scrollTop
        void history.fetchNextPage()
    }

    const pageCount = history.data?.pages.length ?? 0
    const lastMessageId = messages.at(-1)?.id
    const lastAuthorId = messages.at(-1)?.author.id

    // older page added at the top: keep the same messages on screen instead of jumping
    useLayoutEffect(() => {
        const el = scrollRef.current
        if (!el || distanceFromBottomRef.current === null) return
        el.scrollTop = el.scrollHeight - distanceFromBottomRef.current
        distanceFromBottomRef.current = null
    }, [pageCount])

    useLayoutEffect(() => {
        const el = scrollRef.current
        if (!el || !lastMessageId) return

        // first load: jump straight to the bottom, no animation
        if (!hasScrolledInitiallyRef.current) {
            el.scrollTop = el.scrollHeight
            hasScrolledInitiallyRef.current = true
            return
        }

        // always jump to your own messages, only follow others' if you're already at the bottom
        if (lastAuthorId === user.id || isNearBottomRef.current) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
        }
    }, [lastMessageId, lastAuthorId, user.id])

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-10 p-10">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="min-h-0 w-full flex-1 overflow-y-auto scrollbar-none"
            >
                {history.hasNextPage && (
                    <div className="flex justify-center p-2">
                        <button
                            type="button"
                            onClick={loadOlder}
                            disabled={history.isFetchingNextPage}
                            className="text-text-muted hover:bg-primary-tertiary rounded-md px-3 py-1 text-sm disabled:opacity-50"
                        >
                            {history.isFetchingNextPage ? "Loading..." : "Load older messages"}
                        </button>
                    </div>
                )}

                {history.isPending && (
                    <p className="text-text-muted p-4 text-center">Loading messages...</p>
                )}

                {history.isError && (
                    <p className="p-4 text-center text-red-500">Couldn&apos;t load messages.</p>
                )}

                {history.isSuccess && messages.length === 0 && (
                    <p className="text-text-muted p-4 text-center">No messages yet.</p>
                )}

                {messages.map((message) => (
                    <MessageRow
                        key={message.id}
                        message={message}
                        isOwn={message.author.id === user.id}
                    />
                ))}
            </div>
            <InputMessage onSend={(content) => send.mutate({ channelId, content })}/>
        </div>
    )
}

export default ChatContainer
