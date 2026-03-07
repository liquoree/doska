import { createContext, useContext } from 'react'

export const BoardContext = createContext<string | null>(null)

export const useBoardContext = () => {
    const ctx = useContext(BoardContext)
    if (!ctx) throw new Error('useBoardContext must be used within BoardContext.Provider')
    return ctx
}