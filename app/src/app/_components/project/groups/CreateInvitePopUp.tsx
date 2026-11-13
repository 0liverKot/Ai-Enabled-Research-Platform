import { useState } from "react";
import ImageSelect from "../../ui/ImageSelect";
import type { OverviewGroup } from "../home/GroupOverviewElement";

type CreateInvitePopUpProps = {
    className?: string;
    groups: OverviewGroup[]
}

const CreateInvitePopUp = ({className, groups}: CreateInvitePopUpProps) => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const groupOptions = groups.map((group) => ({
        value: group.id,
        label: group.name,
        image: group.image
    }))
    
    return (
        <div className={className}>
            <span className="text-xl underline">Send An Invite</span>

            <label className="text-text-muted mt-4">Select a group:</label>
            <ImageSelect 
                className="relative"
                value={selectedOption}
                options={groupOptions}
                onChange={(value) => setSelectedOption(value)}/>
        </div>
    )
}

export default CreateInvitePopUp