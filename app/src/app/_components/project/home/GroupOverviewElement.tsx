import type { RouterOutputs } from "~/trpc/react"

// full group from the db, plus display fields that aren't stored yet
export type OverviewGroup = RouterOutputs["group"]["mine"][number] & {
    image: string
    notifications: number
}

type GroupOverviewElementProps = {
    group: OverviewGroup
}

const GroupOverviewElement = ({group}: GroupOverviewElementProps) => {
    return (
        <>
        <div className="flex flex-row items-center">
            <img className="h-20 w-20 shrink-0 object-contain mr-2" src={group.image}></img>
            <span className="text-xl mr-auto">{group.name}</span>
            <span className="mr-5">{group.notifications}</span>
        </div>
        </>
    )
}

export default GroupOverviewElement
