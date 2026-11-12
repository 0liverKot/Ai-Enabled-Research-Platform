"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import InviteRow from "./InviteRow";

type GroupInvitationsPopUpProps = {
    onClose: () => void;
};

type InvitationsTab = "received" | "sent";

const tabs: { id: InvitationsTab; label: string }[] = [
    { id: "received", label: "Received" },
    { id: "sent", label: "Sent" },
];

const GroupInvitationsPopUp = ({ onClose }: GroupInvitationsPopUpProps) => {
    const [activeTab, setActiveTab] = useState<InvitationsTab>("received");

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

                    <button className="text-xl hover:scale-105" type="button" aria-label="Close" onClick={onClose}>
                        X
                    </button>
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
            </div>
        </div>
    );
};

export default GroupInvitationsPopUp;
