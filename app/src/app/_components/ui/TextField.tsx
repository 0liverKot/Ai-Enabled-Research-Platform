import type { InputHTMLAttributes } from "react";

type TextFieldProps = {
    id: string;
    label: string;
    icon?: string;
    error?: string | null;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

const TextField = ({
    id,
    label,
    icon,
    error,
    className,
    ...inputProps
}: TextFieldProps) => {
    const errorId = `${id}-error`;

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            <label htmlFor={id}>{label}</label>

            <div
                className={`bg-primary-main focus-within:border-accent-main flex items-center gap-2 rounded-md border px-2 py-1 ${
                    error ? "border-red-500" : "border-primary-tertiary"
                }`}
            >
                {icon && (
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 object-contain opacity-60"
                    />
                )}
                <input
                    id={id}
                    name={id}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className="w-full bg-transparent focus:outline-none"
                    {...inputProps}
                />
            </div>

            {/* Always rendered so the layout doesn't jump when an error appears */}
            <span
                id={errorId}
                className={`text-sm text-red-500 ${error ? "visible" : "invisible"}`}
            >
                {error ?? " "}
            </span>
        </div>
    );
};

export default TextField;
