import { Link, useParams } from "react-router-dom"
import './ProjectPage.scss'
import useProjects from "../store/Projects.store"
import { BoardCard } from "../components/board/BoardCard"
import { ProjectContext } from "../context/ProjectContext"
import { useShallow } from "zustand/shallow"
import { useState } from "react"
import { AddBoardModal } from "../components/modal/AddBoardModal"
import { AddTaskModal } from "../components/modal/AddTaskModal"
import type { User } from "@/shared/types/types"

export default function ProjectPage() {
    const [showAside, setShowAside] = useState(false)
    const [activeBoardId, setActiveBoardId] = useState<string | null>(null)
    const [showAddBoardModal, setShowAddBoardModal] = useState(false)
    const { projectId } = useParams<{ projectId: string }>()
    const project = useProjects(s => s.projects[projectId!])
    const boardIds = useProjects(useShallow(s =>
        Object.values(s.boards)
            .filter(b => b.projectId === projectId)
            .map(b => b.id)
    ))

    const projUsers = useProjects(useShallow(s =>
        projectId
        ? (Object.values(s.users) as User[]).filter(u => u.projectIds?.includes(projectId))
        : null
    ))

    if (!project) return null

    return (
        <ProjectContext.Provider value={projectId!}>
            <div className="project-page">
                <h1 className="project-page__title">
                  <Link to={`/projects`} className="arr"><main>←</main></Link>
                  <span>{project.title}</span>
                  <button className="add-board-btn-small" onClick={() => setShowAddBoardModal(true)}>Добавить доску</button>
                  <section onClick={() => setShowAside(true)}>☰</section>
                </h1>
                <div className="project-page__boards-box" style={boardIds.length === 0 ? { flexDirection: 'column', alignItems: 'center' } : undefined}>
                  {boardIds.length > 0
                    ? (boardIds.map(boardId => (
                        <BoardCard 
                            onAddTask={(boardId) => setActiveBoardId(boardId)} 
                            key={boardId} 
                            boardId={boardId} 
                        />
                    )))
                    : (<span className="empty">Досок пока нет</span>)
                  }
                  <div className="add-board-btn" onClick={() => setShowAddBoardModal(true)}><span>+</span></div>
                </div>

                {showAside &&
                  <aside>
                    <div className="aside-title">
                      <span>Участники</span>
                      <span
                        className="x"
                        onClick={() => setShowAside(false)}
                      >
                        ✕
                      </span>
                    </div>
                    <div className="aside-members-box">
                      {projUsers?.map(e => (
                        <span>@{e.nickname}</span>
                      ))}
                    </div>
                  </aside>
                }
                
                {/* ------ МОДАЛКИ ------ */}
                {showAddBoardModal &&
                    <AddBoardModal onClose={() => setShowAddBoardModal(false)} />
                }
                {activeBoardId &&
                    <AddTaskModal 
                        boardId={activeBoardId}
                        onClose={() => setActiveBoardId(null)} 
                    />
                }
            </div>
        </ProjectContext.Provider>
    )
}