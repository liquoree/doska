import './ProjectsListPage.scss';
import ProjectCard from "../components/ProjectPage/ProjectCard";
import useProjects from '../store/Projects.store';

export default function ProjectsListPage() {
  const items = useProjects(state => state.projects)

  return (
    <div style={{ padding: 24 }} className="projects-list-page">
      <h1>Проекты</h1>
      <div className="projects-list-page__cards-box">
        {items.map((item) => (
          <ProjectCard
            key={item.id} 
            title={item.title} 
            description={item.description || ''} 
            slug={item.slug} 
          />
        ))}

      </div>
    </div>
  );
}