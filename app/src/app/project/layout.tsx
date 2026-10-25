import ProjectsMainSideBar from "../_components/project/ProjectsMainSideBar"

const ProjectLayout = (
    {children,} : 
    {children: React.ReactNode}
    ) => {
        return (
            <div className="flex min-h-screen">
                <ProjectsMainSideBar/>
                <main className="flex-1">{children}</main>
            </div>
        )
    }

export default ProjectLayout