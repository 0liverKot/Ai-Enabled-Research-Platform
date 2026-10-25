import SignInForm from "~/app/_components/project/auth/SignInForm"
import SignUpLink from "~/app/_components/project/auth/SignUpLink"

const SignInPage = ()=> {
    return (
        <>
        <div className="flex flex-col">
            <span className="text-5xl">Sign In</span>
            <div className="flex flex-row mt-2 gap-2">
                <span className="text-sm text-text-muted">{"Don't have an account?"}</span>
                <SignUpLink className="text-sm text-blue-500 hover:underline"/>
            </div>

            <SignInForm className="mt-10"/>
        </div>
        </>
    )
}

export default SignInPage