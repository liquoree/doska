import { Link } from 'react-router-dom';
import './ProjectCard.scss';

type Props = {
    title: string;
    description: string;
    onClick?: () => void;
    slug?: string;
}

export default function ProjectCard({ title, description, onClick, slug }: Props) {
    return (
        <Link to={`/projects/${slug}`} className="project-card" onClick={onClick}>
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
}