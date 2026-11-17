"use client";

import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

const SignOutButton = () => {
    const router = useRouter();

    const signOut = async () => {
        await authClient.signOut();
        router.push("/auth/sign-in");
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
            className="hover:bg-primary-tertiary flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
        >
            <img src="/images/padlock.png" alt="" className="h-5 w-5 object-contain opacity-70" />
        </button>
    );
};

export default SignOutButton;
