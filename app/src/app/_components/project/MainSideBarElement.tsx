"use client";

import { redirect } from "next/navigation";

const MainSideBarElement = ({ img, link }: { img: string; link: string }) => {
    return (
        <>
            <button 
                className="hover:bg-accent-secondary flex h-20 w-20 items-center justify-center rounded-sm border-none shadow-md hover:scale-110" 
                onClick={() => redirect(link)}
            >
                <img className="h-10 w-10 shrink-0 object-contain" src={img} />
            </button>
        </>
    );
};

export default MainSideBarElement;
