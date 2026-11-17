import { getSession } from "~/server/better-auth/server";
import MainSideBarElement from "./MainSideBarElement";
import SignOutButton from "./SignOutButton";

const ProjectsMainSideBar = async () => {
    const session = await getSession();
    const user = session?.user;

    return (
        <aside className="bg-primary-secondary flex h-full w-20 shrink-0 flex-col items-center border-r py-6">
            <nav className="flex w-full flex-col items-center gap-3">
                <MainSideBarElement img="/images/home.png" label="Home" href="/project/home" />
                <MainSideBarElement img="/images/group-chat.png" label="Group chats" href="/project/chat" />
                <MainSideBarElement img="/images/chat-bubble.png" label="Messages" href="/project/messages" />
                <MainSideBarElement img="/images/calendar.png" label="Calendar" href="/project/calendar" />
                <MainSideBarElement img="/images/folder.png" label="Files" href="/project/files" />
            </nav>

            {user && (
                <div className="mt-auto flex flex-col items-center gap-3 border-t pt-4">
                    <SignOutButton />
                    <img
                        src={user.image ?? "/images/user.png"}
                        alt={user.name}
                        title={user.name}
                        className="border-primary-tertiary h-10 w-10 rounded-full border object-cover"
                    />
                </div>
            )}
        </aside>
    );
};

export default ProjectsMainSideBar;
