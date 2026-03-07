import './ProjectsListPage.scss'
import ProjectCard from "../components/ProjectPage/ProjectCard"
import useProjects from '../store/Projects.store'
import { useShallow } from 'zustand/shallow'

export default function ProjectsListPage() {
    const projects = useProjects(useShallow(s => Object.values(s.projects)))

    return (
        <div className="projects-list-page">
            <h1>Проекты</h1>
            <div className="projects-list-page__cards-box">
                {projects.length > 0
                    ? projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            description={project.description || ''}
                            slug={project.slug}
                        />
                    ))
                    : <h2>Проектов пока нет</h2>
                }
            </div>
        </div>
    )
}