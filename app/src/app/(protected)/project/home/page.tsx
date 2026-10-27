import FilesOverview from "~/app/_components/project/home/FilesOverview"
import GroupOverview from "~/app/_components/project/home/GroupOverview"
import MessagesOverview from "~/app/_components/project/home/MessagesOverview"
import TasksOverview from "~/app/_components/project/home/TasksOverview"

const projectHomePage = () => {
    return (
        <>
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full p-15">
            <GroupOverview className="col-start-1 row-start-1 row-span-1 border-2" />
            <FilesOverview className="col-start-1 row-start-2 row-span-2 border-2" />
            <MessagesOverview className="col-start-2 row-start-1 row-span-3 border-2" />
            <TasksOverview className="col-start-3 row-start-1 row-span-3 border-2" />
        </div>
        </>
    )
}

export default projectHomePage