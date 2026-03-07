import type { Task, Board, Project, User } from "@/shared/types/types"
import { MockProjects, MockBoards, MockTasks, MockUsers } from "@/shared/utils/mock-projects"
import { create } from "zustand"
import { produce, type Draft } from 'immer'

interface ProjectState {
    projects: Record<string, Project>
    boards: Record<string, Board>
    tasks: Record<string, Task>
    users: Record<string, User>

    addProject: (project: Project) => void
    removeProject: (id: string) => void

    addBoard: (board: Board) => void
    removeBoard: (boardId: string) => void

    addTask: (task: Task) => void
    updateTask: (taskId: string, updater: (task: Draft<Task>) => void) => void
    removeTask: (taskId: string) => void

    addUser: (user: User) => void
    removeUser: (userId: string) => void
}

const useProjects = create<ProjectState>((set) => ({
    projects: MockProjects,
    boards: MockBoards,
    tasks: MockTasks,
    users: MockUsers,

    addProject: (project) => set(produce(state => {
        state.projects[project.id] = project
    })),

    removeProject: (id) => set(produce(state => {
        (Object.values(state.boards) as Board[])
            .filter(b => b.projectId === id)
            .forEach(b => {
                (Object.values(state.tasks) as Task[])
                    .filter(t => t.boardId === b.id)
                    .forEach(t => delete state.tasks[t.id])
                delete state.boards[b.id]
            })
        delete state.projects[id]
    })),

    addBoard: (board) => set(produce(state => {
        state.boards[board.id] = board
    })),

    removeBoard: (boardId) => set(produce(state => {
        (Object.values(state.tasks) as Task[])
            .filter(t => t.boardId === boardId)
            .forEach(t => delete state.tasks[t.id])
        delete state.boards[boardId]
    })),

    addTask: (task) => set(produce(state => {
        state.tasks[task.id] = task
    })),

    updateTask: (taskId, updater) => set(produce(state => {
        updater(state.tasks[taskId])
    })),

    removeTask: (taskId) => set(produce(state => {
        delete state.tasks[taskId]
    })),

    addUser: (user) => set(produce(state => {
        state.users[user.id] = user
    })),

    removeUser: (userId) => set(produce(state => {
        delete state.users[userId]
    })),
}))

export default useProjects