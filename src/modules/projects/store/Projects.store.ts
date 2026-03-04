import { MockProjects } from "@/shared/utils/mock-projects";
import type { Project } from "@/shared/types/types";
import { create } from "zustand";

interface ProjectState {
    projects: Project[]
    addProject: (project: Project) => void
    removeProject: (id: string) => void 
}

const useProjects = create<ProjectState>((set) => ({
    projects: MockProjects,

    addProject: (project) => set((state) => ({
        projects: [...state.projects, project] 
    })),

    removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
    }))
}))

export default useProjects