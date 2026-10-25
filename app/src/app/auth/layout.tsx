export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col rounded-xl bg-primary-secondary h-4/7 w-1/4 shadow-xl">
                <div className="bg-accent-main rounded-t-xl h-1/12 pt-2 pl-4">
                    <span className="text-xl text-text-accent-secondary">AI Enabled Research Platform</span>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}