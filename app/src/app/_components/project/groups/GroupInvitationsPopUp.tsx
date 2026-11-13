"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import InviteRow from "./InviteRow";
import CreateInviteButton from "./CreateInviteButton";
import CreateInvitePopUp from "./CreateInvitePopUp";
import type { OverviewGroup } from "../home/GroupOverviewElement";

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
    const [activeTab, setActiveTab] = useState<InvitationsTab>("received");
    const [isCreateInviteOpen, setIsCreateInviteOpen] = useState(false)

    const { data: invites, isPending, error } = api.group.myReceivedInvites.useQuery()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative flex h-1/2 w-1/2 flex-col overflow-hidden rounded-xl border-t-6 border-accent-main bg-primary-main p-10 shadow-xl">
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
                        isPending ? (
                            <p className="text-text-muted">Loading invitations…</p>
                        ) : error ? (
                            <p className="text-red-500">{"Couldn't load invitations."}</p>
                        ) : invites.length === 0 ? (
                            <p className="text-text-muted">No pending invites.</p>
                        ) : (
                            invites.map((invite) => (
                                <InviteRow key={`${invite.id}-invite`} invite={invite}/>
                            ))
                        )
                    ) : (
                        <p className="text-text-muted">Placeholder: invitations you have sent will appear here.</p>
                    )}
                </div>
                
                {isCreateInviteOpen && (
                    <CreateInvitePopUp 
                    className="z-10 absolute inset-y-10 right-10 w-1/2 bg-primary-secondary border rounded-xl shadow-md p-4 flex flex-col"
                    groups={groups}/>
                )}

            </div>
        </div>
    );
};

export default GroupInvitationsPopUp;
