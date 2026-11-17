"use client"

import { useLayoutEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"

// past this height the textarea stops growing and scrolls instead
const MAX_HEIGHT_PX = 200

type InputMessageProps = {
    onSend?: (message: string) => void
    placeholder?: string
}

const InputMessage = ({ onSend, placeholder = "Message" }: InputMessageProps) => {
    const [message, setMessage] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // resize to fit the text whenever it changes (including when it's cleared after sending)
    useLayoutEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        // reset first so it can shrink, otherwise scrollHeight never gets smaller
        textarea.style.height = "auto"
        const height = Math.min(textarea.scrollHeight, MAX_HEIGHT_PX)
        textarea.style.height = `${height}px`
        textarea.style.overflowY = textarea.scrollHeight > MAX_HEIGHT_PX ? "auto" : "hidden"
    }, [message])

    const send = () => {
        const trimmed = message.trim()
        if (!trimmed) return

        onSend?.(trimmed)
        setMessage("")
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Enter sends, Shift+Enter adds a new line
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            send()
        }
    }

    return (
        <div className="bg-primary-main focus-within:border-accent-main border-primary-tertiary flex w-full items-end gap-2 rounded-md border px-3 py-2">
            <textarea
                ref={textareaRef}
                rows={1}
                value={message}
                placeholder={placeholder}
                aria-label="Message"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-w-0 flex-1 resize-none overflow-hidden bg-transparent focus:outline-none"
            />
            <button
                type="button"
                onClick={send}
                disabled={!message.trim()}
                className="bg-accent-main text-text-inverted hover:bg-accent-secondary shrink-0 rounded-sm px-3 py-1 disabled:opacity-50"
            >
                Send
            </button>
        </div>
    )
}

export default InputMessage
