import { useEffect, useRef, useState } from "react";
import TextField from "../../ui/TextField";
import { api } from "~/trpc/react";

type CreateGroupPopUpProps = {
    onClose: () => void;
};

const CreateGroupPopUp = ({ onClose }: CreateGroupPopUpProps) => {
    
    const ref = useRef<HTMLDivElement>(null)
    
    const utils = api.useUtils()
    const createMutation = api.group.create.useMutation({
        onSuccess: async () => {
            await utils.group.mine.invalidate()
            onClose()
        },
        onError: (err) => alert(err.message)
    })

    const [groupName, setGroupName] = useState("")
    const [groupDescription, setGroupDescription] = useState("")

    const createGroup = () => {
        if (!groupName) return

        const trimmedName = groupName.trim()
        const trimmedDescription = groupDescription.trim()
        createMutation.mutate({
            name: trimmedName,
            description: trimmedDescription === "" ? undefined : trimmedDescription
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div ref={ref} className="relative flex h-1/2 w-1/2 flex-col overflow-hidden rounded-xl border-t-6 border-accent-main bg-primary-main p-10 shadow-xl">
                <div className="flex justify-between">
                    <h2 className="text-xl underline">Create a group</h2>
                    <button className="text-xl hover:scale-105" type="button" onClick={onClose}>
                        X
                    </button>
                </div>

                <div className="flex flex-row h-full w-full gap-4 mt-4">
                    <div className="flex flex-col bg-primary-secondary h-full w-1/2 p-2 rounded-md">
                        <TextField
                            id="group-name"
                            label="Group Name:"
                            className="mt-2 text-text-muted"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />

                        <label className="text-text-muted">
                            Group Description
                            <label className="text-sm">{" (optional)"}</label>
                            :
                        </label>
                        <TextField
                            id="group-description"
                            label=""
                            className="min-h-0 flex-1"
                            multiline
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col w-1/2 gap-2">
                        <div className="text-text-muted bg-primary-secondary h-1/2 rounded-md">
                            Add an Image
                        </div>
                        
                        <div className="text-text-muted bg-primary-secondary h-1/4">
                            Invite Users
                        </div>

                        <button 
                        className="bg-accent-main rounded-md w-1/2 h-10 text-text-accent-secondary m-auto hover:scale-105"
                        onClick={createGroup}
                        >
                            Create Group
                        </button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default CreateGroupPopUp;
