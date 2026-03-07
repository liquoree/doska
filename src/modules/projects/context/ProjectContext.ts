import { createContext, useContext } from 'react'

export const ProjectContext = createContext<string | null>(null)

export const useProjectContext = () => {
    const ctx = useContext(ProjectContext)
    if (!ctx) throw new Error('useProjectContext must be used within ProjectContext.Provider')
    return ctx
}