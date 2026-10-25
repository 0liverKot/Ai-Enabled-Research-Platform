import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";
    
const Page = async () => {
    const session = await getSession();    
        if(!session?.user) {
        redirect("/auth/sign-in")
        }
        else {
            redirect("/project/chat")
        }
}

export default Page