"use-client";

type ChatBarOptionProps = {
    label: string;
};

const ChatBarOption = ({ label }: ChatBarOptionProps) => {
    return (
        <button className="hover:bg-primary-tertiary w-full rounded-sm border-none pl-1 text-left">
            {label}
        </button>
    );
};

export default ChatBarOption;
