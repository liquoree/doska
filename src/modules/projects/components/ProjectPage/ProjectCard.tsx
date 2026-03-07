import { Link } from 'react-router-dom'
import './ProjectCard.scss'
import type { Project } from '@/shared/types/types'

type Props = Omit<Project, never>

export default function ProjectCard({ id, title, description, slug }: Props) {
    return (
        <Link to={`/projects/${id}`} className="project-card">
            <h2>{title}</h2>
            {slug && <div>@{slug}</div>}
            <p>{description}</p>
        </Link>
    )
}