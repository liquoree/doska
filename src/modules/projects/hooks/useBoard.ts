import useProjects from '../store/Projects.store'

export const useBoard = (boardId: string) => {
    const removeBoard = useProjects(state => state.removeBoard)
    const board = useProjects(state => state.boards[boardId])

    return {
        board,
        remove: () => removeBoard(boardId) 
    }
}