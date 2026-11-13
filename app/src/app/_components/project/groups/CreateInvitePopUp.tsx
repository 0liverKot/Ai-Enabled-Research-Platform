import { useState } from "react";
import ImageSelect from "../../ui/ImageSelect";
import type { OverviewGroup } from "../home/GroupOverviewElement";
import { api } from "~/trpc/react";

type CreateInvitePopUpProps = {
    className?: string;
    groups: OverviewGroup[]
}

const CreateInvitePopUp = ({className, groups}: CreateInvitePopUpProps) => {

    const [selectedGroupOption, setSelectedGroupOption] = useState<string | null>(null)
    const [selectedUserOption, setSelectedUserOption] = useState<string | null>(null)

    const groupOptions = groups.map((group) => ({
        value: group.id,
        label: group.name,
        image: group.image
    }))

    const { data: users } = api.user.notInGroup.useQuery(
        { groupId: selectedGroupOption! },
        { enabled: selectedGroupOption !== null } // locks selected users till you select a group
    )

    const userOptions = (users ?? []).map((user) => ({
        value: user.id,
        label: user.name,
        image: user.image ?? "/images/user.png"
    }))
    
    return (
        <div className={className}>
            <span className="text-xl underline">Send An Invite</span>

            <label className="text-text-muted mt-4">Select a group:</label>
            <ImageSelect 
                className="relative"
                value={selectedGroupOption}
                options={groupOptions}
                onChange={(value) => {
                    setSelectedGroupOption(value)
                    setSelectedUserOption(null) // previous user may already be in the new group
                }}
            />

            <label className="text-text-muted mt-4">Select a user:</label>
            <ImageSelect
                className="relative"
                value={selectedUserOption}
                options={userOptions}
                onChange={(value) => setSelectedUserOption(value)}
                disabled={selectedGroupOption === null}
            />
        </div>
    )
}

export default CreateInvitePopUp