"use client"

import { useState } from "react"

import CreateGroupButton from "../groups/CreateGroupButton"
import CreateGroupPopUp from "../groups/CreateGroupPopUp"
import GroupInvitationsButton from "../groups/GroupInvitationsButton"
import GroupOverviewElement, { type GroupOverviewElementProps } from "./GroupOverviewElement"
import GroupInvitationsPopUp from "../groups/GroupInvitationsPopUp"

type GroupOverviewProps = {
    className?: string
    groups: [GroupOverviewElementProps] | null
}

const GroupOverview = ({className, groups = null}: GroupOverviewProps) => {
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
    const [isGroupInvitationsOpen, setIsGroupInvitationsOpen] = useState(false)

    return ( 
        <>
        <div className={`${className ?? ""} flex min-h-0 flex-col overflow-hidden p-2`}>
            <div className="flex flex-row items-center p-2 gap-4">
                <span className="text-xl w-full">Your Groups</span>
                <GroupInvitationsButton 
                    buttonClassName="border-2 p-2 rounded-md shadow-md hover:scale-110" 
                    imageClassName="w-8 h-8 shrink-0 content-contain"
                    onClick={() => (setIsGroupInvitationsOpen(true))}
                />

                <CreateGroupButton
                    buttonClassName="border-2 p-2 rounded-md shadow-md hover:scale-110"
                    imageClassName="w-8 h-8 shrink-0 content-contain"
                    onClick={() => setIsCreateGroupOpen(true)}
                />
            </div>

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
        
        {isCreateGroupOpen && (
            <CreateGroupPopUp onClose={() => setIsCreateGroupOpen(false)} />
        )}
        
        {isGroupInvitationsOpen && (
            <GroupInvitationsPopUp onClose={() => setIsGroupInvitationsOpen(false)} />
        )}
        </>
    
    )   
}

export default GroupOverview