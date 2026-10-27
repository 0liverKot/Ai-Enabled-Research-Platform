"use client"

type GroupInvitationsButtonProps = {
    buttonClassName?: string
    imageClassName?: string
    onClick?: () => void
}

const GroupInvitationsButton = ({
    buttonClassName,
    imageClassName,
    onClick,
}: 
GroupInvitationsButtonProps) => {
    return (
        <button className={buttonClassName} onClick={onClick}>
            <img src="/images/add-group.png" className={imageClassName}></img>
        </button>
    )
}

export default GroupInvitationsButton