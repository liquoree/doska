import './ProjectsListPage.scss';
import ProjectCard from "../components/ProjectPage/ProjectCard";

export default function ProjectsListPage() {
  return (
    <div style={{ padding: 24 }} className="projects-list-page">
      <h1>Проекты</h1>
      <div className="projects-list-page__cards-box">
          <ProjectCard title="Demo Project" description="Это демонстрационный проект" slug='gay-project' />

      </div>
    </div>
  );
}