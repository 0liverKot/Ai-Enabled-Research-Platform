"use client"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "~/server/better-auth/client"
import TextField from "~/app/_components/ui/TextField"

type SignInFormProps = {
    className?: string
}

type SignInErrors = {
    email: string | null
    password: string | null
}

const SignInForm = ({className}: SignInFormProps) => {

    const [errors, setErrors] = useState<SignInErrors>({email: null, password: null})
    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        if (formError) {
            alert(formError)
        }
    }, [formError])

    const submitSignInForm = async (e: React.SubmitEvent) => {
        
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const newErrors = {
            email: !email ? "Please enter your email address" : null,
            password: !password ? "Please enter your password" : null
        }
        
        setErrors(newErrors)

        if(!email || !password) {
            return 
        }

        const {data, error} = await authClient.signIn.email({
            email,
            password
        })

        if (error) {
            // 422 corresponds with validation issues
            if (error.status === 400) {
                setFormError(error.message!)
            } else {
                setFormError("Something went wrong. Please try again")
            }
        } else {
            redirect("/project/chat")
        }
    }

    return ( 

        <div className={className}>
            <form noValidate className="flex flex-col gap-6" onSubmit={submitSignInForm}>
                <TextField id="email" label="Email Address:" icon="/images/email.png" type="email" autoComplete="email" error={errors.email}/>
                <TextField id="password" label="Password:" icon="/images/padlock.png" type="password" autoComplete="current-password" error={errors.password}/>

                <button className="border-none bg-accent-main rounded-md w-1/2 m-auto h-10 text-text-accent-secondary hover:scale-105" type="submit">Sign In</button>
            </form>

        </div>
    )
}

export default SignInForm