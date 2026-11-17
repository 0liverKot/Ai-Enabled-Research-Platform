"use client"

import type { User } from "generated/prisma"
import InputMessage from "./InputMessage"
import { useState } from "react"
import MessageRow from "./MessageRow"

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

    const addMessage = (text: string) => {
        setMessages((prev) => [...prev, { sender: user, text, seq }])
        setSeq((prev) => prev + 1)
    }

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-10 p-10">
            <div className="min-h-0 w-full flex-1 overflow-y-auto scrollbar-none">
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
