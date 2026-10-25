"use client"

import { useState } from "react"
import { authClient } from "~/server/better-auth/client"

type SignInFormProps = {
    className?: string
}

const SignInForm = ({className}: SignInFormProps) => {

    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const submitSignInForm = async (e: React.SubmitEvent) => {
        
        e.preventDefault()
        
        setEmailError(null)
        setPasswordError(null)

        const formData = new FormData(e.target)
        const email = formData.get("email") as string
        const password = formData.get("email") as string

        if(!email) {
            setEmailError("Please enter your email address")
        } 
        if(!password) {
            setPasswordError("Please enter your password")
        }
        
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
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/user.png" />
                    <input type="text" id="email" name="password" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${emailError ? "visible" : "invisible"} text-sm text-red-500 mb-10`}>{emailError ?? "No error message"}</span>

                <label htmlFor="password">Password:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/padlock.png" />
                    <input type="text" id="password" name="password" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${passwordError ? "visible" : "invisible"} text-sm text-red-500 mb-10`}>{passwordError ?? "No error message"}</span>

                <button className="border-none bg-accent-main rounded-md w-1/2 m-auto h-10 text-text-accent-secondary hover:scale-105" type="submit">Sign In</button>
            </form>

        </div>
    )
}

export default SignInForm