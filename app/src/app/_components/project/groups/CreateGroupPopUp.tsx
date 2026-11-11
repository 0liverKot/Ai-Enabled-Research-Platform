type CreateGroupPopUpProps = {
    onClose: () => void;
};

const CreateGroupPopUp = ({ onClose }: CreateGroupPopUpProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative flex h-1/2 w-1/2 flex-col overflow-hidden rounded-xl border-t-6 border-accent-main bg-primary-main p-10 shadow-xl">
                <div className="flex justify-between">
                    <h2 className="text-xl underline">Create a group</h2>
                    <button className="text-xl hover:scale-105" type="button" onClick={onClose}>
                        X
                    </button>
                </div>

                <form className="flex flex-row h-full w-full gap-4 mt-4">
                    <div className="flex flex-col bg-primary-secondary h-full w-1/2 p-2 rounded-md">
                        <label htmlFor="group-name" className="mt-2">Group Name:</label>
                        <input id="group-name" name="group-name" className="rounded-md border border-primary-tertiary bg-white px-2 py-1 focus:border-accent-main focus:outline-none" />

                        <label htmlFor="group-description" className="mt-4">Group Description:</label>
                        <textarea id="group-description" name="group-description" className="rounded-md border border-primary-tertiary bg-white px-2 py-1 focus:border-accent-main focus:outline-none h-full resize-none"/>
                    </div>

                    <div className="flex flex-col w-1/2 gap-2">
                        <div className="bg-primary-secondary h-1/2 rounded-md">
                            Add an Image
                        </div>
                        
                        <div className="bg-primary-secondary h-1/4">
                            Invite Users
                        </div>

                        <button className="bg-accent-main rounded-md w-1/2 h-10 text-text-accent-secondary m-auto hover:scale-105">Create Group</button>
                    </div>
                </form>


            </div>

        </div>
    );
};

export default CreateGroupPopUp;
