"use client"

import { useEffect, useRef, useState } from "react";

type Option = {
    value: string;
    label: string; 
    image: string; 
}

type ImageSelectProps = {
    className?: string,
    options: Option[],
    value: string | null,
    onChange: (value: string) => void,
    placeholder?: string
}

const ImageSelect = ({ 
    className,
    options,
    value, 
    onChange, 
    placeholder = "Select..."
}: ImageSelectProps) => {
    
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((option) => option.value === value)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])


    return (
        <div ref={ref} className={className}>
            <button
            type="button"
            onClick={() => setOpen((open) => !open)}
            className="flex w-full items-center gap-2 rounded border px-3 py-2 test-left">
                {selected ? (
                    <>
                        <img src={selected.image} className="h-6 w-6 rounded-full object-cover"/>
                        <span>{selected.label}</span>
                    </>
                ) : (
                    <span className="text-text-muted">{placeholder}</span>
                )}                
            </button>
            
            {open && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-primary-secondary shadow-md">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange(option.value)
                                setOpen(false)
                            }}
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-primary-tertiary"
                            >
                                <img src={option.image} className="h-6 w-6 rounded-full object-cover"/>
                                <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default ImageSelect