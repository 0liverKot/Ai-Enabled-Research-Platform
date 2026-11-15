"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import ReceivedInviteRow from "./ReceivedInviteRow";
import CreateInviteButton from "./CreateInviteButton";
import CreateInvitePopUp from "./CreateInvitePopUp";
import type { OverviewGroup } from "../home/GroupOverviewElement";
import SentInviteRow from "./SentInviteRow";

type GroupInvitationsPopUpProps = {
    groups: OverviewGroup[],
    onClose: () => void;
};

type InvitationsTab = "received" | "sent";

const tabs: { id: InvitationsTab; label: string }[] = [
    { id: "received", label: "Received" },
    { id: "sent", label: "Sent" },
];

const GroupInvitationsPopUp = ({ groups, onClose }: GroupInvitationsPopUpProps) => {

    const ref = useRef<HTMLDivElement>(null)

    const [activeTab, setActiveTab] = useState<InvitationsTab>("received");
    const [isCreateInviteOpen, setIsCreateInviteOpen] = useState(false)

    const { 
        data: receivedInvites, 
        isPending: receivedIsPending, 
        error: receivedError } = api.group.myReceivedInvites.useQuery()
    
    const { 
        data: sentInvites, 
        isPending: sentIsPending, 
        error: sentError } = api.group.mySentInvites.useQuery()

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
                <div className="flex items-baseline justify-between">
                    <div role="tablist" className="flex items-baseline gap-4">
                        {tabs.map((tab) => {
                            const isActive = tab.id === activeTab;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={
                                        isActive
                                            ? "text-2xl text-text-main underline"
                                            : "text-lg text-text-muted hover:text-text-main"
                                    }
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex gap-10">                        
                        <CreateInviteButton 
                            buttonClassName="hover:scale-105" 
                            imageClassName="h-8 w-8 shrink-0 object-cover"
                            onClick={() => setIsCreateInviteOpen(true)}
                        />
                        
     
                     <button className="text-xl hover:scale-105" type="button" aria-label="Close" onClick={onClose}>
                            X
                    </button>

                    </div>
                </div>


                <div className="mt-6">
                    {activeTab === "received" ? (
                        receivedIsPending ? (
                            <p className="text-text-muted">Loading invitations…</p>
                        ) : receivedError ? (
                            <p className="text-red-500">{"Couldn't load invitations."}</p>
                        ) : receivedInvites.length === 0 ? (
                            <p className="text-text-muted">No invites received.</p>
                        ) : (
                            receivedInvites.map((invite) => (
                                <ReceivedInviteRow key={`${invite.id}-invite`} invite={invite}/>
                            ))
                        )
                    ) : (
                        sentIsPending ? (
                            <p className="text-text-muted">Loading invitations…</p>
                        ) : sentError ? (
                            <p className="text-red-500">{"Couldn't load invitations."}</p>
                        ) : sentInvites.length === 0 ? (
                            <p className="text-text-muted">No invites sent.</p>
                        ) : (
                            sentInvites.map((invite) => (
                                <SentInviteRow key={`${invite.id}-invite`} invite={invite}/>
                            ))
                        )
                    )}
                </div>
                
                {isCreateInviteOpen && (
                    <CreateInvitePopUp 
                    className="z-10 absolute inset-y-10 right-10 w-1/2 bg-primary-secondary border rounded-xl shadow-md p-4 flex flex-col"
                    groups={groups}
                    onClose={() => setIsCreateInviteOpen(false)}/>
                )}

            </div>
        </div>
    );
};

export default GroupInvitationsPopUp;
