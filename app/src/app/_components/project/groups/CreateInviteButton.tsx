'use client'

type CreateInviteButtonProps = {
    buttonClassName?: string;
    imageClassName?: string;
    onClick?: () => void;
};

const CreateInviteButton = ({
    buttonClassName,
    imageClassName,
    onClick
}: CreateInviteButtonProps) => {
    return (
        <button className={buttonClassName} onClick={onClick}>
            <img src="/images/add-user.png" className={imageClassName}/>
        </button>
    )
}

export default CreateInviteButton;