import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
    id: string;
    label: string;
    icon?: string;
    error?: string | null;
    className?: string;
};

type InputFieldProps = BaseProps & { multiline?: false } & Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "id" | "className"
    >;

type TextareaFieldProps = BaseProps & { multiline: true } & Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        "id" | "className"
    >;

type TextFieldProps = InputFieldProps | TextareaFieldProps;

const TextField = (props: TextFieldProps) => {
    const { id, label, icon, error, className } = props;
    const errorId = `${id}-error`;

    const sharedProps = {
        id,
        name: id,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : undefined,
    };

    const renderField = () => {
        if (props.multiline) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: _id, label: _label, icon: _icon, error: _error, className: _className, multiline: _multiline, ...textareaProps } = props;
            return (
                <textarea
                    {...sharedProps}
                    rows={4}
                    className="w-full resize-none bg-transparent focus:outline-none"
                    {...textareaProps}
                />
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, label: _label, icon: _icon, error: _error, className: _className, multiline: _multiline, ...inputProps } = props;
        return (
            <input
                {...sharedProps}
                className="w-full bg-transparent focus:outline-none"
                {...inputProps}
            />
        );
    };

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            <label htmlFor={id}>{label}</label>

            <div
                className={`bg-primary-main focus-within:border-accent-main flex gap-2 rounded-md border px-2 py-1 ${
                    props.multiline ? "items-start" : "items-center"
                } ${error ? "border-red-500" : "border-primary-tertiary"}`}
            >
                {icon && (
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 object-contain opacity-60"
                    />
                )}
                {renderField()}
            </div>

            {/* Always rendered so the layout doesn't jump when an error appears */}
            <span
                id={errorId}
                className={`text-sm text-red-500 ${error ? "visible" : "invisible"}`}
            >
                {error ?? " "}
            </span>
        </div>
    );
};

export default TextField;
