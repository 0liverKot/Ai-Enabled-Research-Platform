"use client"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "~/server/better-auth/client"
import TextField from "~/app/_components/ui/TextField"

type SignUpFormProps = {
    className?: string
}

type SignUpErrors = {
    name: string | null
    email: string | null
    password: string | null
}

const SignUpForm = ({className}: SignUpFormProps) => {
    
    const [errors, setErrors] = useState<SignUpErrors>({name: null, email: null, password: null})
    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        if (formError) {
            alert(formError)
        }
    }, [formError])

    const submitSignInForm = async (e: React.SubmitEvent) => {
        
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const newErrors = {
            name: !name ? "Please enter your display name" : null,
            email: !email ? "Please enter your email address" : null,
            password: !password ? "Please enter your password" : null
        }
        
        setErrors(newErrors)
        setFormError(null)

        if(!name || !email || !password) {
            return 
        }

        const {data, error} = await authClient.signUp.email({
            name,
            email,
            password
        })

        console.log(data, error)

        if (error) {
            // 422 corresponds with validation issues
            if (error.status === 400) {
                setFormError(error.message!)
            } else {
                setFormError("Something went wrong. Please try again")
            }
        } else {
            redirect("/project/home")
        }
    }

    return (
        
        <div className={className}>
            <form noValidate className="flex flex-col gap-2" onSubmit={submitSignInForm}>
                <TextField id="name" label="Display Name:" icon="/images/user.png" autoComplete="name" error={errors.name}/>
                <TextField id="email" label="Email Address:" icon="/images/email.png" type="email" autoComplete="email" error={errors.email}/>
                <TextField id="password" label="Password:" icon="/images/padlock.png" type="password" autoComplete="new-password" error={errors.password}/>

                <button className="border-none bg-accent-main rounded-md w-1/2 m-auto h-10 text-text-accent-secondary hover:scale-105" type="submit">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUpForm