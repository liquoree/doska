import { Link, useParams } from "react-router-dom"
import './ProjectPage.scss'
import useProjects from "../store/Projects.store"
import { BoardCard } from "../components/board/BoardCard"
import { ProjectContext } from "../context/ProjectContext"
import { useShallow } from "zustand/shallow"
import { useState, useEffect } from "react"
import { AddBoardModal } from "../components/modal/AddBoardModal"
import { AddTaskModal } from "../components/modal/AddTaskModal"
import type { User } from "@/shared/types/types"
import { useLoadSingleProject } from "../hooks/useLoadSingleProject"
import { DndContext, DragOverlay, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { setDragging } from '../utils/dragState'
import { updateTask } from '@/api/tasks'
import { TaskCard } from "../components/task/TaskCard"

export default function ProjectPage() {

    const [showAside, setShowAside] = useState(false)
    const [activeBoardId, setActiveBoardId] = useState<string | null>(null)
    const [showAddBoardModal, setShowAddBoardModal] = useState(false)
    const { projectId } = useParams<{ projectId: string }>()

    // dnd стейты
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
    const [taskOrder, setTaskOrder] = useState<Record<string, string[]>>({})
    const updateTaskStore = useProjects(s => s.updateTask)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // px — меньше этого расстояния = клик, больше = drag
            },
        })
    )
    //

    const { loading } = useLoadSingleProject(projectId!)
    const project = useProjects(s => s.projects[projectId!])
    const boardIds = useProjects(useShallow(s =>
        Object.values(s.boards)
            .filter(b => b.projectId === projectId)
            .map(b => b.id)
    ))
    const allTasks = useProjects(useShallow(s => s.tasks))
    const projectUsers = useProjects(useShallow(s => Object.values(s.users) as User[]))

    // синкаем локальный порядок из стора — только когда не идёт drag
    useEffect(() => {
        setTaskOrder(prev => {
            const byBoard: Record<string, string[]> = {}
            Object.values(allTasks).forEach(task => {
                if (!byBoard[task.boardId]) byBoard[task.boardId] = []
                byBoard[task.boardId].push(task.id)
            })

            const next: Record<string, string[]> = {}
            for (const boardId of Object.keys(byBoard)) {
                const freshIds = byBoard[boardId]
                const prevOrder = prev[boardId] ?? []
                // сохраняем порядок, убираем удалённые, добавляем новые в конец
                const kept = prevOrder.filter(id => freshIds.includes(id))
                const added = freshIds.filter(id => !prevOrder.includes(id))
                next[boardId] = [...kept, ...added]
            }
            return next
        })
    }, [allTasks])

    if (!projectId) return null
    if (!project && !loading) return null
    if (loading) return <div>Загрузка...</div>
    if (!project) return null

    const onDragStart = ({ active }: DragStartEvent) => {
        setDragging(true)
        setActiveTaskId(String(active.id))
    }

    const onDragEnd = async ({ active, over }: DragEndEvent) => {
        setActiveTaskId(null)

        if (!over) {
            setDragging(false)
            return
        }

        const taskId = String(active.id)
        const overId = String(over.id)

        const tasks = useProjects.getState().tasks
        const boards = useProjects.getState().boards

        const sourceBoardId = tasks[taskId]?.boardId
        const targetBoardId = tasks[overId]?.boardId ?? (boards[overId] ? overId : null)

        if (!sourceBoardId || !targetBoardId) {
            setDragging(false)
            return
        }

        if (sourceBoardId === targetBoardId) {
            // ── сортировка внутри доски ──────────────────────────────────
            const order = taskOrder[sourceBoardId] ?? []
            const oldIndex = order.indexOf(taskId)
            const newIndex = order.indexOf(overId)

            if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                setTaskOrder(prev => ({
                    ...prev,
                    [sourceBoardId]: arrayMove(order, oldIndex, newIndex),
                }))
            }
            setDragging(false)
            return
        }

        // ── перемещение между досками ────────────────────────────────────
        const oldBoardId = sourceBoardId

        // оптимистично обновляем стор
        updateTaskStore(taskId, t => { t.boardId = targetBoardId })

        // обновляем локальный порядок
        setTaskOrder(prev => {
            const sourceList = (prev[oldBoardId] ?? []).filter(id => id !== taskId)
            const targetList = [...(prev[targetBoardId] ?? [])]
            const overIndex = targetList.indexOf(overId)
            if (overIndex !== -1) {
                targetList.splice(overIndex, 0, taskId)
            } else {
                targetList.push(taskId)
            }
            return { ...prev, [oldBoardId]: sourceList, [targetBoardId]: targetList }
        })

        try {
            // держим dragging=true пока идёт запрос - поллинг не стреляет
            await updateTask(projectId, taskId, { boardId: targetBoardId })
        } catch {
            // откат
            updateTaskStore(taskId, t => { t.boardId = oldBoardId })
        } finally {
            setDragging(false) // только здесь, после завершения запроса
        }
    }

    return (
        <ProjectContext.Provider value={projectId!}>
            <div className="project-page">
                <h1 className="project-page__title">
                  <Link to={`/projects`} className="arr"><main>←</main></Link>
                  <span>{project.title}</span>
                  <button className="add-board-btn-small" onClick={() => setShowAddBoardModal(true)}>Добавить доску</button>
                  <section onClick={() => setShowAside(true)}>☰</section>
                </h1>
                <DndContext
                  sensors={sensors} 
                  collisionDetection={closestCorners}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                >
                  <div className="project-page__boards-box" style={boardIds.length === 0 ? { flexDirection: 'column', alignItems: 'center' } : undefined}>
                    {boardIds.length > 0
                      && (boardIds.map(boardId => (
                          <BoardCard
                              onAddTask={(boardId) => setActiveBoardId(boardId)}
                              key={boardId}
                              boardId={boardId}
                              taskIds={taskOrder[boardId] ?? []}
                          />
                      )))
                    }
                    {(!loading && boardIds.length === 0) && <h2>Досок пока нет</h2>}
                    <div className="add-board-btn" onClick={() => setShowAddBoardModal(true)}><span>+</span></div>
                  </div>
                  <DragOverlay>
                    {activeTaskId ? <TaskCard taskId={activeTaskId} /> : null}
                  </DragOverlay>
                </DndContext>

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
                      {projectUsers?.map(e => (
                        <span key={e.id}>@{e.nickname}</span>
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