import './ProjectsListPage.scss';
import ProjectCard from "../components/ProjectPage/ProjectCard";
import useProjects from '../store/Projects.store';

export default function ProjectsListPage() {
  const items = useProjects(state => state.projects)

  return (
    <div className="projects-list-page">
      <h1>Проекты</h1>
      <div className="projects-list-page__cards-box">
        {items.map((item) => (
          <ProjectCard
            id={item.id}
            key={item.id} 
            title={item.title} 
            description={item.description || ''} 
            slug={item.slug} 
          />
        ))}
        {!!!items && <h2>Проектов пока нет</h2>}
      </div>
    </div>
  );
}