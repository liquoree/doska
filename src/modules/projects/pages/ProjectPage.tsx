import { useParams } from "react-router-dom";
import './ProjectPage.scss';

export default function ProjectPage() {
  const { projectSlug } = useParams();

  return (
    <div style={{ padding: 24 }} className="project-page">
      <h1>Project: {projectSlug}</h1>
      <p>Тут будет доска, колонки и задачи.</p>
    </div>
  );
}