import FilesOverview from "~/app/_components/project/home/FilesOverview";
import GroupOverview from "~/app/_components/project/home/GroupOverview";
import MessagesOverview from "~/app/_components/project/home/MessagesOverview";
import TasksOverview from "~/app/_components/project/home/TasksOverview";

const projectHomePage = () => {
    
    const groups = null
    //const groups = [
    //    {groupImage: "/images/group-chat.png", name: "Group 1", notifications: 0},
    //    {groupImage: "/images/group-chat.png", name: "Group 2", notifications: 1},
    //    {groupImage: "/images/group-chat.png", name: "Group 3", notifications: 50},
    //    {groupImage: "/images/group-chat.png", name: "Group 4", notifications: 1000},
    //    {groupImage: "/images/group-chat.png", name: "Group 5", notifications: 1000},
    //    {groupImage: "/images/group-chat.png", name: "Group 6", notifications: 1000}
    //]
    
    
    return (
        <>
            <div className="grid h-full min-h-0 grid-cols-3 grid-rows-[repeat(3,minmax(0,1fr))] gap-4 overflow-hidden p-15">
                <GroupOverview className="col-start-1 row-span-1 row-start-1 border-2" groups={groups}/>
                <FilesOverview className="col-start-1 row-span-2 row-start-2 border-2" />
                <MessagesOverview className="col-start-2 row-span-3 row-start-1 border-2" />
                <TasksOverview className="col-start-3 row-span-3 row-start-1 border-2" />
            </div>
        </>
    );
};

export default projectHomePage;
