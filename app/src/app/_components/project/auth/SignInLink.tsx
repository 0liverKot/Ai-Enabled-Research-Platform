"use client"
import Link from "next/link"

type SignInLinkProps = {
    className?: string
}

const SignInLink = ({className}: SignInLinkProps) => {
    return <Link href="/auth/sign-in" className={className}>Go back to Sign In</Link>
}

export default SignInLink