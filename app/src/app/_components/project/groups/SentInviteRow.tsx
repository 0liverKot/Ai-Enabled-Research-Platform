import { useRouter } from "next/navigation"
import { timeAgo } from "~/app/lib/time"
import type { RouterOutputs } from "~/trpc/react"
import { api } from "~/trpc/react"

type ReceivedInvite = RouterOutputs["group"]["mySentInvites"][number]

type InviteRowProps = {
    invite: ReceivedInvite
}

const ReceivedInviteRow = ({invite}: InviteRowProps) => {

    const router = useRouter()
    const utils = api.useUtils()
    
    const cancel = api.group.cancel.useMutation({
        onSuccess: async () => {
            await utils.group.mySentInvites.invalidate()
            router.refresh()
        }
    })

    return (
        <div className="flex bg-primary-secondary border rounded-xl justify-between items-center mb-4">
            <div className="flex gap-8 items-center">
                <div className="flex border-r pr-2 p-4 flex-col gap-1 justify-center items-center">
                    <span>{invite.invitee.name}</span>
                    <img 
                        src={invite.invitee.image ?? "/images/user.png"}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"    
                    />
                </div>

                <div className="flex flex-col pt-1 gap-2 items-left">
                    <div className="flex gap-2 items-center">
                        <span className="text-xl">{invite.group.name}</span>
                        <span className="text-xs text-text-muted">{timeAgo(invite.createdAt)}</span>
                    </div>
                    <span className="text-xs text-text-muted">{invite.message ?? "We would like you to join our group!"}</span>
                </div>
            </div>

            <button 
            className="mr-10 bg-accent-main text-text-accent-secondary rounded-xl border h-10 w-1/5 hover:scale-105 hover:bg-red-500"
            onClick={() => cancel.mutate({ inviteId: invite.id })}>
                {cancel.isPending ? "Cancelling...": "Cancel"}
            </button>
        
            {cancel.error && (
                <span className="text-xs text-red-500">{cancel.error.message}</span>
            )}
        </div>
    )
}

export default ReceivedInviteRow