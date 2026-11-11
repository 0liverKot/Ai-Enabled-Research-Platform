import { api } from "~/trpc/server";

import FilesOverview from "~/app/_components/project/home/FilesOverview";
import GroupOverview from "~/app/_components/project/home/GroupOverview";
import MessagesOverview from "~/app/_components/project/home/MessagesOverview";
import TasksOverview from "~/app/_components/project/home/TasksOverview";

const projectHomePage = async () => {
    

    const groups = (await api.group.mine()).map((group) => ({
        name: group.name,
        
        // temporary until these features are properly added
        groupImage: "/images/group-chat.png",
        notifications: 0
    }));
   
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
