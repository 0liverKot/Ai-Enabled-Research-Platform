"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ChatBarOptionProps = {
    label: string;
    // what sits before the label: "#" for channels, an avatar for DMs
    leading?: ReactNode;
    href?: string;
};

const ChatBarOption = ({ label, leading, href }: ChatBarOptionProps) => {
    const pathname = usePathname();
    const active = href !== undefined && pathname === href;

    const content = (
        <>
            {leading && (
                <span className="text-text-muted flex h-6 w-6 shrink-0 items-center justify-center">
                    {leading}
                </span>
            )}
            <span className="truncate">{label}</span>
        </>
    );

    const base = "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left";

    if (!href) {
        return (
            <div className={`${base} text-text-muted cursor-default`} title="Coming soon">
                {content}
            </div>
        );
    }

    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${base} ${
                active
                    ? "bg-accent-secondary text-text-accent-secondary"
                    : "hover:bg-primary-tertiary"
            }`}
        >
            {content}
        </Link>
    );
};

export default ChatBarOption;
