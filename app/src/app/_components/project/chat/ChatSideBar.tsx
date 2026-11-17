import type { RouterOutputs } from "~/trpc/react";
import ChatBarOption from "./ChatBarOption";
import ExpandableList from "./ExpandableList";

type SideBarGroup = NonNullable<RouterOutputs["group"]["get"]>;
type SideBarChannel = RouterOutputs["channel"]["list"][number];
type SideBarDM = RouterOutputs["channel"]["dms"][number];

type ChatSideBarProps = {
    group: SideBarGroup;
    channels: SideBarChannel[];
    dms: SideBarDM[];
};

// placeholders until agents exist
const PLACEHOLDER_AGENTS = ["Research Assistant", "Literature Reviewer"];

const ChatSideBar = ({ group, channels, dms }: ChatSideBarProps) => {
    return (
        <aside className="bg-primary-secondary flex h-full w-64 shrink-0 flex-col border-r">
            <header className="border-b p-4">
                <h2 className="truncate text-xl font-semibold">{group.name}</h2>
                {group.description && (
                    <p className="text-text-muted mt-1 line-clamp-2 text-sm">{group.description}</p>
                )}
            </header>

            <nav className="scrollbar-none flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-3">
                <ExpandableList label="Channels">
                    {channels.map((channel) => (
                        <ChatBarOption
                            key={channel.id}
                            label={channel.name}
                            leading="#"
                            href={`/project/chat/${group.id}/${channel.id}`}
                        />
                    ))}
                </ExpandableList>

                <ExpandableList label="Direct Messages">
                    {dms.length > 0 ? (
                        dms.map((dm) => (
                            <ChatBarOption
                                key={dm.id}
                                label={dm.otherUser.name}
                                href={`/project/chat/${group.id}/${dm.id}`}
                                leading={
                                    <img
                                        src={dm.otherUser.image ?? "/images/user.png"}
                                        alt=""
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                }
                            />
                        ))
                    ) : (
                        <span className="text-text-muted px-2 text-sm">No one else is here yet</span>
                    )}
                </ExpandableList>

                <ExpandableList label="Agents">
                    {PLACEHOLDER_AGENTS.map((agent) => (
                        <ChatBarOption
                            key={agent}
                            label={agent}
                            leading={
                                <img
                                    src="/images/chat-bubble.png"
                                    alt=""
                                    className="h-4 w-4 object-contain opacity-60"
                                />
                            }
                        />
                    ))}
                </ExpandableList>
            </nav>
        </aside>
    );
};

export default ChatSideBar;
