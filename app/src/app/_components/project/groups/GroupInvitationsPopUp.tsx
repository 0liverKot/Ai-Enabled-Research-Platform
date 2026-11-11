type GroupInvitationsPopUpProps = {
    onClose: () => void;
};

const GroupInvitationsPopUp = ({ onClose }: GroupInvitationsPopUpProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative flex h-1/2 w-1/2 flex-col overflow-hidden rounded-xl border-t-6 border-accent-main bg-primary-main p-10 shadow-xl">

                    <div className="flex justify-between">
                        <h2 className="text-xl underline">Group Invitations</h2>
                        <button className="text-xl hover:scale-105" type="button" aria-label="Close" onClick={onClose}>
                            X
                        </button>
                        
                    </div>
                </div>
            </div>
   );
};

export default GroupInvitationsPopUp;
