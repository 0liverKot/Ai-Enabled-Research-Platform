import InputMessage from "./InputMessage"

const ChatContainer = () => {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-10 p-10">
            <div className="min-h-0 w-full flex-1 overflow-y-auto border">
                Chat box
            </div>
            <InputMessage/>
        </div>
    )
}

export default ChatContainer