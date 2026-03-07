import { useParams } from "react-router-dom"
import './ProjectPage.scss'
import useProjects from "../store/Projects.store"
import { BoardCard } from "../components/board/BoardCard"
import { ProjectContext } from "../context/ProjectContext"
import { useShallow } from "zustand/shallow"
import { useState } from "react"
import { AddBoardModal } from "../components/modal/AddBoardModal"

export default function ProjectPage() {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false)
    const { projectId } = useParams<{ projectId: string }>()
    const project = useProjects(s => s.projects[projectId!])
    const boardIds = useProjects(useShallow(s =>
        Object.values(s.boards)
            .filter(b => b.projectId === projectId)
            .map(b => b.id)
    ))

    if (!project) return null

    return (
        <ProjectContext.Provider value={projectId!}>
            <div className="project-page">
                <h1 className="project-page__title">{project.title}</h1>
                <div className="project-page__boards-box" style={boardIds.length === 0 ? { flexDirection: 'column', alignItems: 'center' } : undefined}>
                  {boardIds.length > 0
                    ? (boardIds.map(boardId => (
                        <BoardCard key={boardId} boardId={boardId} />
                    )))
                    : (<span className="empty">Досок пока нет</span>)
                  }
                  <div className="add-board-btn" onClick={() => setShowAddBoardModal(true)}><span>+</span></div>
                </div>
                {showAddBoardModal &&
                    <AddBoardModal onClose={() => setShowAddBoardModal(false)} />
                }
            </div>
        </ProjectContext.Provider>
    )
}