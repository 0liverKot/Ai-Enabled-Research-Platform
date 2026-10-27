type CreateGroupPopUpProps = {
    onClose: () => void;
};

const CreateGroupPopUp = ({ onClose }: CreateGroupPopUpProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-primary-main relative h-1/2 w-1/2 border-2 p-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4"
                >
                    X
                </button>
                <h2 className="text-xl">Create a group</h2>
            </div>
        </div>
    );
};

export default CreateGroupPopUp;
