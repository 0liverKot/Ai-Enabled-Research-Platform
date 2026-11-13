"use client"

import { useState } from "react"
import CreateGroupButton from "../groups/CreateGroupButton"
import CreateGroupPopUp from "../groups/CreateGroupPopUp"
import GroupInvitationsButton from "../groups/GroupInvitationsButton"
import GroupOverviewElement, { type OverviewGroup } from "./GroupOverviewElement"
import GroupInvitationsPopUp from "../groups/GroupInvitationsPopUp"

type GroupOverviewProps = {
    className?: string
    groups: OverviewGroup[]
}

const GroupOverview = ({className, groups}: GroupOverviewProps) => {
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
    const [isGroupInvitationsOpen, setIsGroupInvitationsOpen] = useState(false)


    return ( 
        <>
        <div className={`${className ?? ""} flex min-h-0 flex-col overflow-hidden p-2`}>
            <div className="flex flex-row items-center p-2 gap-4">
                <span className="text-xl w-full">Your Groups</span>
                <GroupInvitationsButton 
                    buttonClassName="border-2 p-2 rounded-md shadow-md hover:scale-105 hover:bg-primary-tertiary" 
                    imageClassName="w-8 h-8 shrink-0 content-contain"
                    onClick={() => (setIsGroupInvitationsOpen(true))}
                />

                <CreateGroupButton
                    buttonClassName="bg-primary-secondary border-2 p-2 rounded-md shadow-md hover:scale-105 hover:bg-primary-tertiary"
                    imageClassName="w-8 h-8 shrink-0 content-contain"
                    onClick={() => setIsCreateGroupOpen(true)}
                />
            </div>

            <div className="border"></div>
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
                {groups.length > 0 ? 
                <>
                {groups.map((group) => {
                    return (
                    <div key={`group-element-${group.id}`}>
                        <GroupOverviewElement group={group}/>
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
        
        {isCreateGroupOpen && (
            <CreateGroupPopUp onClose={() => setIsCreateGroupOpen(false)} />
        )}
        
        {isGroupInvitationsOpen && (
            <GroupInvitationsPopUp groups={groups} onClose={() => setIsGroupInvitationsOpen(false)} />
        )}
        </>
    
    )   
}

export default GroupOverview