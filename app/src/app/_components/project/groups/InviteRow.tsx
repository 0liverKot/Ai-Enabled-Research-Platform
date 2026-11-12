import { useRouter } from "next/navigation"
import type { RouterOutputs } from "~/trpc/react"
import { api } from "~/trpc/react"

type ReceivedInvite = RouterOutputs["group"]["myReceivedInvites"][number]

type InviteRowProps = {
    invite: ReceivedInvite
}

const InviteRow = ({invite}: InviteRowProps) => {

    const router = useRouter()
    const utils = api.useUtils()
    
    const accept = api.group.accept.useMutation({
        onSuccess: async () => {
            await utils.group.myReceivedInvites.invalidate()
            router.refresh()
        }
    })

    const decline = api.group.reject.useMutation({
        onSuccess: async () => {
            await utils.group.myReceivedInvites.invalidate()
            router.refresh()
        }
    })

    return (
        <div className="flex bg-primary-secondary border rounded-xl gap-8 items-center">
            <div className="flex border-r pr-2 p-4 flex-col gap-1 justify-center items-center">
                <span>{invite.inviter.name}</span>
                <img 
                    src={invite.inviter.image ?? "/images/user.png"}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"    
                />
            </div>

            <div className="flex flex-col pt-1 gap-2 items-left">
                <span className="text-xl">{invite.group.name}</span>
                <span className="text-xs text-text-muted">{invite.message ?? "We would like you to join our group!"}</span>
            </div>

            <button 
            className="bg-accent-main text-text-accent-secondary rounded-xl border h-10 w-1/5 hover:scale-105 hover:bg-accent-secondary"
            onClick={() => accept.mutate({ inviteId: invite.id })}>
                {accept.isPending ? "Joining...": "Accept"}
            </button>

            {accept.error && (
                <span className="text-xs text-red-500">{accept.error.message}</span>
            )}
            
            <button 
            className="bg-red-400 rounded-xl border h-10 w-1/5 hover:scale-105 hover:bg-red-500"
            onClick={() => decline.mutate({ inviteId: invite.id })}>
                {decline.isPending ? "Declining...": "Decline"}
            </button>
        
            {decline.error && (
                <span className="text-xs text-red-500">{decline.error.message}</span>
            )}
        </div>
    )
}

export default InviteRow
