"use client"

import { useState } from "react"
import { authClient } from "~/server/better-auth/client"

type SignInFormProps = {
    className?: string
}

type SignInErrors = {
    email: string | null
    password: string | null
}

const SignInForm = ({className}: SignInFormProps) => {

    const [errors, setErrors] = useState<SignInErrors>({email: null, password: null})

    const submitSignInForm = async (e: React.SubmitEvent) => {
        
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email") as string
        const password = formData.get("passowrd") as string

        const newErrors = {
            email: !email ? "Please enter your email address" : null,
            password: !email ? "Please enter your password" : null
        }
        
        setErrors(newErrors)

        if(!email || !password) {
            return 
        }

        await authClient.signIn.email({
            email,
            password
        })
    }


    return ( 

        <div className={className}>
            <form className="flex flex-col" onSubmit={submitSignInForm}>
                <label htmlFor="email" >Email Address:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/email.png" />
                    <input type="text" id="email" name="password" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${errors.password ? "visible" : "invisible"} text-sm text-red-500 mb-10`}>{errors.password ?? "No error message"}</span>

                <label htmlFor="password">Password:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/padlock.png" />
                    <input type="text" id="password" name="password" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${errors.password ? "visible" : "invisible"} text-sm text-red-500 mb-10`}>{errors.password ?? "No error message"}</span>

                <button className="border-none bg-accent-main rounded-md w-1/2 m-auto h-10 text-text-accent-secondary hover:scale-105" type="submit">Sign In</button>
            </form>

        </div>
    )
}

export default SignInForm