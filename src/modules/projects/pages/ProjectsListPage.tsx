import './ProjectsListPage.scss'
import ProjectCard from "../components/ProjectsListPage/ProjectCard"
import useProjects from '../store/Projects.store'
import { useShallow } from 'zustand/shallow'
import { AddProjectModal } from '../components/modal/AddProjectModal'
import { JoinProjectModal } from '../components/modal/JoinProjectModal'
import { useState } from 'react'
import { useLoadProjects } from '../hooks/useLoadProjects'

export default function ProjectsListPage() {
    const { loading, error } = useLoadProjects()
    const projects = useProjects(useShallow(s => Object.values(s.projects)))
    const [showAddProjModal, setShowAddProjModal] = useState(false)
    const [showJoinProjModal, setShowJoinProjModal] = useState(false)

    return (
        <div className="projects-list-page">
            <h1>
                <span>Проекты</span>
                <div
                    className="add-proj-btn"
                    onClick={() => setShowAddProjModal(true)}
                >
                    Создать проект
                </div>
                <div
                    className="add-proj-btn"
                    onClick={() => setShowJoinProjModal(true)}
                >
                    Присоединиться к проекту
                </div>
            </h1>
            <div className="projects-list-page__cards-box">
                {loading && <div style={{textAlign: 'center', fontSize: '24px'}}>Загрузка...</div>}
                {(!loading && projects.length > 0)
                    && projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            description={project.description || ''}
                            slug={project.slug}
                        />
                    ))
                }
                {(!loading && projects.length === 0) && <h2>Проектов пока нет</h2>}
                {error && <h2>{error}</h2>}
            </div>
            {showAddProjModal &&
                <AddProjectModal onClose={() => setShowAddProjModal(false)}/>
            }
            {showJoinProjModal &&
                <JoinProjectModal onClose={() => setShowJoinProjModal(false)}/>
            }
        </div>
    )
}