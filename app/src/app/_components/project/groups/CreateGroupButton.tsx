"use client";

type CreateGroupButtonProps = {
    buttonClassName?: string;
    imageClassName?: string;
    onClick?: () => void;
};

const CreateGroupButton = ({
    buttonClassName,
    imageClassName,
    onClick,
}: CreateGroupButtonProps) => {
    return (
        <button type="button" className={buttonClassName} onClick={onClick}>
            <img src="/images/plus.png" className={imageClassName}></img>
        </button>
    );
};

export default CreateGroupButton;
