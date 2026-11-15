import { useEffect, useRef, useState } from "react";
import ImageSelect from "../../ui/ImageSelect";
import type { OverviewGroup } from "../home/GroupOverviewElement";
import { api } from "~/trpc/react";
import TextField from "../../ui/TextField";

type CreateInvitePopUpProps = {
    className?: string;
    groups: OverviewGroup[];
    onClose: () => void;
}

const CreateInvitePopUp = ({className, groups, onClose}: CreateInvitePopUpProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const utils = api.useUtils()
    const inivteMutation = api.group.invite.useMutation({
        onSuccess: async () => {
            await utils.user.notInGroup.invalidate()
            onClose()
        },
        onError: (err) => alert(err.message)
    })

    const [selectedGroupOption, setSelectedGroupOption] = useState<string | null>(null)
    const [selectedUserOption, setSelectedUserOption] = useState<string | null>(null)
    const [message, setMessage] = useState("")

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

    const sendInvite = () => {
        if(!selectedGroupOption || !selectedUserOption) return

        const trimmedMessage = message.trim()
        inivteMutation.mutate({
            groupId: selectedGroupOption,
            inviteeId: selectedUserOption,
            message: trimmedMessage === "" ? undefined : trimmedMessage
        })

    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose()
            }
        }   
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [onClose])
    
    return (
        <div ref={ref} className={className}>
                 
            <div className="flex justify-between">
                <span className="text-xl underline">Send An Invite</span>
                
                <button className="text-xl hover:scale-105" type="button" aria-label="Close" onClick={onClose}>
                    X
                </button>

            </div>

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

            <label className="text-text-muted mt-4">
                Add a message
                <label className="text-sm">{" (optional)"}</label>
                :
            </label>
            <TextField 
                id="message" 
                label="" 
                multiline rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />

            <button 
            className="border w-1/2 mt-4 h-10 bg-accent-main text-text-accent-secondary rounded-xl border hover:scale-105 hover:bg-accent-secondary"
            onClick={sendInvite}
            >
                {inivteMutation.isPending ? "Sending..." : "Send"}
            </button>
        </div>
    )
}

export default CreateInvitePopUp