import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session?.user) {
        redirect("/auth/sign-in");
    }

    return <>{children}</>;
}