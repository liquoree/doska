import { Link } from 'react-router-dom'
import './ProjectCard.scss'
import type { Project } from '@/shared/types/types'
import useProjects from '../../store/Projects.store'
import { leaveProject } from '@/api/projects'

type Props = Omit<Project, never>

export default function ProjectCard({ id, title, description, slug }: Props) {
    const removeProject = useProjects(s => s.removeProject)

    return (
        <Link to={`/projects/${id}`} className="project-card">
            <h2>{title}</h2>
            {slug && <div>@{slug}</div>}
            <p>{description}</p>
            <span
                className='x'
                onClick={async (e) => {
                    e.preventDefault()
                    await leaveProject(id)
                    removeProject(id)
                }}
            >×</span>
        </Link>
    )
}