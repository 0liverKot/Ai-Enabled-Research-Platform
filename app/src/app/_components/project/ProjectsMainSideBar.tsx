import MainSideBarElement from "./MainSideBarElement"

const ProjectsMainSideBar = () => {
    return (
        <>
        
        <div className="flex min-h-screen flex-col justify-evenly border p-4 pt-20 pb-20 bg-accent-main">
            <MainSideBarElement img="/images/group-chat.png" link="N/A"/>
            <MainSideBarElement img="/images/home.png" link="N/A"/>
            <MainSideBarElement img="/images/chat-bubble.png" link="N/A"/>
            <MainSideBarElement img="/images/calendar.png" link="N/A"/>
            <MainSideBarElement img="/images/folder.png" link="N/A"/>
        </div>
        
        </>
    )
}

export default ProjectsMainSideBar