"use client"
import Link from "next/link"

type SignUpLinkProps = {
    className?: string
}

const SignUpLink = ({className}: SignUpLinkProps) => {
    return <Link href="/auth/sign-up" className={className}>Create an Account</Link>
}

export default SignUpLink