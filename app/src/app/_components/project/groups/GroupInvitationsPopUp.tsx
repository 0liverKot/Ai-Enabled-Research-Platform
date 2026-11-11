type GroupInvitationsPopUpProps = {
    onClose: () => void;
};

const GroupInvitationsPopUp = ({ onClose }: GroupInvitationsPopUpProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-accent-main relative h-1/2 w-1/2 rounded-xl p-6 shadow-xl">
                <div className="flex flex-col bg-primary-main h-full w-full p-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl underline">Group Invitations</h2>
                        <button type="button" onClick={onClose}>
                            X
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupInvitationsPopUp;
