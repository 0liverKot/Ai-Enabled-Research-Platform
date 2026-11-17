import type { ChatMessage } from "./ChatContainer"

type MessageRowProps = {
    message: ChatMessage
    isOwn: boolean
}

const MessageRow = ({ message, isOwn }: MessageRowProps) => {
    const { author: sender, content: text } = message

    return (
        <div className={`flex flex-col gap-1 p-2 ${isOwn ? "items-end" : "items-start"}`}>
            <span className="text-text-muted mx-12 text-sm">{isOwn ? "You" : sender.name}</span>

            <div className={`flex w-full items-center gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                <img
                    src={sender.image ?? "/images/user.png"}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                />

                <p
                    className={`max-w-[70%] min-w-0 rounded-lg px-3 py-2 whitespace-pre-wrap wrap-anywhere ${
                        isOwn ? "bg-accent-main text-text-inverted" : "bg-primary-tertiary"
                    }`}
                >
                    {text}
                </p>
            </div>
        </div>
    )
}

export default MessageRow
