import { useParams } from "react-router-dom";
import './ProjectPage.scss';
import useProjects from "../store/Projects.store";
import { BoardCard } from "../components/board/BoardCard";

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = useProjects(s => s.projects.find(p => p.id === projectId))

  return (
    <div className="project-page">
      <h1 className="project-page__title">{project?.title}</h1>
      <div className="project-page__boards-box">
        {project?.boards.map(board => (
          <BoardCard 
            key={board.id}
            id={board.id}
            title={board.title}
            tasks={[...board.tasks]}
            projectId={projectId!}
          />
        ))}
      </div>
    </div>
  );
}