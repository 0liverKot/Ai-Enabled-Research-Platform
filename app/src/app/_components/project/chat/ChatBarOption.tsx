"use-client"

type ChatBarOptionProps = {
    label: string
}

const ChatBarOption = ({
    label
}: ChatBarOptionProps) => {
    return (
        <button className="hover:bg-primary-tertiary border-none rounded-sm w-full text-left pl-1">{label}</button>
    )
}

export default ChatBarOption