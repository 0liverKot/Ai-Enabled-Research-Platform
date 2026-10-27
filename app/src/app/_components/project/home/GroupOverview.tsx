import GroupOverviewElement, { type GroupOverviewElementProps } from "./GroupOverviewElement"

type GroupOverviewProps = {
    className?: string
    groups: [GroupOverviewElementProps] | null
}

const GroupOverview = ({className, groups = null}: GroupOverviewProps) => {
    
    return ( 
        <div className={`${className ?? ""} flex min-h-0 flex-col overflow-hidden p-4`}>
            <span className="text-xl">Your Groups</span>
            <div className="border"></div>
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
                {groups ? 
                <>
                {groups.map((group) => {
                    return (
                    <div key={`group-element-${group.name}`}>
                        <GroupOverviewElement groupImage={group.groupImage} name={group.name} notifications={group.notifications}/>
                        <div className="border border-primary-secondary"></div>
                    </div>)}
                    )}
                </>
                : 
                <>
                    <span className="mt-4 block text-text-muted">{"It appears you aren't a member of any groups. Create a new group or join an existing one."}</span>
                </>
                }
            </div>
        </div>
    
    )   
}

export default GroupOverview