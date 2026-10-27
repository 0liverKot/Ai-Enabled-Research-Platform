import ProjectsMainSideBar from "~/app/_components/project/ProjectsMainSideBar";

type ProjectLayoutProps = {
    children: React.ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <ProjectsMainSideBar />
            <main className="min-h-0 min-w-0 flex-1">{children}</main>
        </div>
    );
};

export default ProjectLayout;
