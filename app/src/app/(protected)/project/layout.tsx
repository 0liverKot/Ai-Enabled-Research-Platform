import ProjectsMainSideBar from "~/app/_components/project/ProjectsMainSideBar";

type ProjectLayoutProps = {
    children: React.ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <ProjectsMainSideBar />
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default ProjectLayout;
