import useProjects from '../store/Projects.store'
import { useProjectContext } from '../context/ProjectContext'
import { deleteBoard } from '@/api/boards'

export const useBoard = (boardId: string) => {
    const projectId = useProjectContext()
    const removeBoard = useProjects(state => state.removeBoard)
    const board = useProjects(state => state.boards[boardId])

    return {
        board,
        remove: async () => {
            await deleteBoard(projectId, boardId)
            removeBoard(boardId)
        }
    }
}