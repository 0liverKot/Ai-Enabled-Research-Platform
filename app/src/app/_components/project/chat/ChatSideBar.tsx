import ChatBarOption from "./ChatBarOption"
import ExpandableList from "./ExpandableList"

const ChatSideBar = () => {
    
    const channelChildrenLabels = ["channel 1", "channel 2", "channel 3"]
    const directMessageChildrenLabels = ["User 1", "User 2", "User 3"]
    const agentChildrenLabels = ["Agent 1", "Agent 2"]

    return (
        <>
        <div className="flex w-1/7 min-h-screen flex-col border p-4 pt-20 pb-20 bg-primary-secondary">
            <span className="text-2xl">Group Name</span>
            <ExpandableList label="Channels" className="mt-20">
                {channelChildrenLabels.map((label) => {
                    return <ChatBarOption key={`channel-${label}`} label={label}/>
                })}
            </ExpandableList>
         
            <ExpandableList label="Direct Messages" className="mt-20">
                {directMessageChildrenLabels.map((label) => {
                    return <ChatBarOption key={`channel-${label}`} label={label}/>
                })}
            </ExpandableList>
         
            <ExpandableList label="Channels" className="mt-20">
                {agentChildrenLabels.map((label) => {
                    return <ChatBarOption key={`channel-${label}`} label={label}/>
                })}
            </ExpandableList>
        </div>
        </>
    )
}

export default ChatSideBar