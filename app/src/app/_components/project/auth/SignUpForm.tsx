"use client"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "~/server/better-auth/client"

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
            redirect("/project/chat")
        }
    }

    return (
        
        <div className={className}>
            <form className="flex flex-col" onSubmit={submitSignInForm}>
                <label htmlFor="email" >Display Name:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/user.png" />
                    <input type="text" id="name" name="name" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${errors?.name ? "visible" : "invisible"} text-sm text-red-500 mb-3`}>{errors?.name ?? "No error message"}</span>
                
                <label htmlFor="email" >Email Address:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/email.png" />
                    <input type="text" id="email" name="email" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${errors.email ? "visible" : "invisible"} text-sm text-red-500 mb-3`}>{errors.email ?? "No error message"}</span>

                <label htmlFor="password">Password:</label>
                <div className="flex flex-row bg-primary-main border-2">
                    <img className="h-7 w-7 shrink-0 object-contain m-2" src="/images/padlock.png" />
                    <input type="password" id="password" name="password" className="w-full focus:outline-none border-s-2 pl-2"/>
                </div>
                
                <span className={`${errors.password ? "visible" : "invisible"} text-sm text-red-500 mb-5`}>{errors.password ?? "No error message"}</span>

                <button className="border-none bg-accent-main rounded-md w-1/2 m-auto h-10 text-text-accent-secondary hover:scale-105" type="submit">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUpForm