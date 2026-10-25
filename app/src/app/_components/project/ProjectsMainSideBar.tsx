import MainSideBarElement from "./MainSideBarElement"

const ProjectsMainSideBar = () => {
    return (
        <>
        
        <div className="flex min-h-screen flex-col justify-evenly border p-4 pt-20 pb-20 bg-purple-500">
            <MainSideBarElement img="/images/group-chat.png" text="Channels" link="N/A"/>
            <MainSideBarElement img="/images/home.png" text="Home" link="N/A"/>
            <MainSideBarElement img="/images/chat-bubble.png" text="DMs" link="N/A"/>
            <MainSideBarElement img="/images/calendar.png" text="Calendar" link="N/A"/>
            <MainSideBarElement img="/images/folder.png" text="Files" link="N/A"/>
        </div>
        
        </>
    )
}

export default ProjectsMainSideBar