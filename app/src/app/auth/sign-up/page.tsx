import SignInLink from "~/app/_components/project/auth/SignInLink"
import SignUpForm from "~/app/_components/project/auth/SignUpForm"

const SignUpPage = () => {
    return (
        <>
        <div className="flex flex-col">
            <span className="text-4xl">Create An Account</span>
            <div className="flex flex-row mt-2 gap-2">
                <SignInLink className="text-sm text-blue-500 hover:underline"/>
            </div>

            <SignUpForm className="mt-10"/>
        </div>
        </>
    )
}

export default SignUpPage