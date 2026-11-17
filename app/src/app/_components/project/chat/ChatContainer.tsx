"use client"

import type { User } from "generated/prisma"
import InputMessage from "./InputMessage"
import { useLayoutEffect, useRef, useState } from "react"
import MessageRow from "./MessageRow"

// how close (px) to the bottom still counts as "at the bottom"
const NEAR_BOTTOM_PX = 80

export type ChatUser = Pick<User, "id" | "name" | "image">

export type Message = {
    sender: ChatUser
    text: string
    seq: number
}

type ChatContainerProps = {
    user: ChatUser
}

const ChatContainer = ({user}: ChatContainerProps) => {

    const [messages, setMessages] = useState<Message[]>([])
    const [seq, setSeq] = useState(0)

    const scrollRef = useRef<HTMLDivElement>(null)
    const isNearBottomRef = useRef(true)

    const handleScroll = () => {
        const el = scrollRef.current
        if (!el) return
        isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX
    }

    useLayoutEffect(() => {
        const el = scrollRef.current
        const last = messages.at(-1)
        if (!el || !last) return

        // always jump to your own messages, only follow others' if you're already at the bottom
        if (last.sender.id === user.id || isNearBottomRef.current) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
        }
    }, [messages, user.id])

    const addMessage = (text: string) => {
        setMessages((prev) => [...prev, { sender: user, text, seq }])
        setSeq((prev) => prev + 1)
    }

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-10 p-10">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="min-h-0 w-full flex-1 overflow-y-auto scrollbar-none"
            >
                {messages.map((message) => {
                    return (
                        <MessageRow
                            key={message.seq}
                            message={message}
                            isOwn={message.sender.id === user.id}
                        />
                    )
                })}
            </div>
            <InputMessage onSend={addMessage}/>
        </div>
    )
}

export default ChatContainer
