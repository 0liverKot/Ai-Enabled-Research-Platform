"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import { useState } from "react";

type ExpandableListProps = {
    label: string;
    children: ReactNode;
    className?: string;
    defaultExpanded?: boolean;
};

const ExpandableList = ({
    label,
    children,
    className = "",
    defaultExpanded = true,
}: ExpandableListProps) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <section className={className}>
            <button
                type="button"
                aria-expanded={expanded}
                className="flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-black/10"
                onClick={() => setExpanded((isExpanded) => !isExpanded)}
            >
                <span>{label}</span>
                <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>

            {expanded && (
                <ul className="mt-1 pl-2">
                    {Children.map(children, (child) => (
                        <li className="ml-2 py-1">{child}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default ExpandableList;
