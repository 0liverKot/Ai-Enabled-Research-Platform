"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MainSideBarElementProps = {
    img: string;
    label: string;
    href?: string;
    // highlight for any route under this prefix, e.g. /project/chat/... (defaults to href)
    matchPrefix?: string;
};

const MainSideBarElement = ({ img, label, href, matchPrefix }: MainSideBarElementProps) => {
    const pathname = usePathname();
    const prefix = matchPrefix ?? href;
    const active = prefix !== undefined && (pathname === prefix || pathname.startsWith(`${prefix}/`));

    const tile = `relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
        active ? "bg-accent-main shadow-md" : href ? "hover:bg-primary-tertiary" : "opacity-40"
    }`;

    const icon = (
        // icons are black line art, invert turns them white on the accent background
        <img src={img} alt="" className={`h-6 w-6 object-contain ${active ? "invert" : ""}`} />
    );

    return (
        <div className="group relative flex w-full justify-center">
            <span
                aria-hidden="true"
                className={`bg-accent-main absolute top-1/2 left-0 w-1 -translate-y-1/2 rounded-r-full transition-all ${
                    active ? "h-8" : "h-0 group-hover:h-4"
                }`}
            />

            {href ? (
                <Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={tile}>
                    {icon}
                </Link>
            ) : (
                <span aria-label={`${label} (coming soon)`} role="img" className={`${tile} cursor-default`}>
                    {icon}
                </span>
            )}

            <span className="bg-text-main text-text-inverted pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 rounded-md px-2 py-1 text-sm whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {href ? label : `${label} · coming soon`}
            </span>
        </div>
    );
};

export default MainSideBarElement;
