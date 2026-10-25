import ProjectsMainSideBar from "../_components/ProjectsMainSideBar"

const ProjectLayout = (
    {children,} : 
    {children: React.ReactNode}
    ) => {
        return (
            <div className="flex">
                <ProjectsMainSideBar/>
                <main>{children}</main>
            </div>
        )
    }

export default ProjectLayout