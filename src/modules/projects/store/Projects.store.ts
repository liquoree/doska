import { MockProjects } from "@/shared/utils/mock-projects";
import type { Task, Board, Project, User } from "@/shared/types/types";
import { create } from "zustand";
import { type Draft, produce } from 'immer'

interface ProjectState {
    projects: Project[]
    addProject: (project: Project) => void
    removeProject: (id: string) => void
    addBoard: (projecId: string, board: Board) => void
    addTask: (projectId: string, boardId: string, task: Task) => void
    updateTask: (projectId: string, boardId: string, taskId: string, updater: (task: Draft<Task>) => void) => void
    addUser: (projectId: string, user: User) => void
    removeUser: (projectId: string, userId: string) => void
}

const useProjects = create<ProjectState>((set) => ({
    projects: MockProjects,

    //projects
    addProject: (project) => set(state => ({
        projects: [...state.projects, project] 
    })),

    removeProject: (id) => set(state => ({
        projects: state.projects.filter(p => p.id !== id)
    })),

    //boards
    addBoard: (projectId, board) => set(state => ({
        projects: state.projects.map(p => 
            p.id === projectId 
                ? { ...p, boards: [...p.boards, board]}
                : p
        ),
    })),

    //tasks
    addTask: (projectId, boardId, task) => set(state => ({
        projects: state.projects.map(p =>
            p.id === projectId
                ? {...p, boards: p.boards.map(b => 
                    b.id === boardId
                        ? { ...b, tasks: [...b.tasks, task]}
                        : b
                )}
                : p
        ),
    })),

    updateTask: (projectId, boardId, taskId, updater) =>
        set(produce(state => {
            const task = state.projects
                .find((p: { id: string; }) => p.id === projectId)?.boards
                .find((b: { id: string; }) => b.id === boardId)?.tasks
                .find((t: { id: string; }) => t.id === taskId);
            if (task) updater(task);
        })),

    // users
    addUser: (projectId, user) => set(state => ({
        projects: state.projects.map(p => 
            p.id === projectId 
                ? { ...p, users: [...p.users, user]}
                : p
        ),
    })),

    removeUser: (projectId, userId) => set(state => ({
        projects: state.projects.map(p => 
            p.id === projectId 
                ? { ...p, users: p.users.filter(u => u.id !== userId)}
                : p
        ),
    }))
}))

export default useProjects