export type GroupOverviewElementProps = {
    groupImage: string,
    name: string
    notifications: number
}

const GroupOverviewElement = ({groupImage, name, notifications}: GroupOverviewElementProps) => {
    return (
        <>
        <div className="flex flex-row items-center">
            <img className="h-20 w-20 shrink-0 object-contain mr-2" src={groupImage}></img>
            <span className="text-xl mr-auto">{name}</span>
            <span className="mr-5">{notifications}</span>
        </div>
        </>
    )
}

export default GroupOverviewElement