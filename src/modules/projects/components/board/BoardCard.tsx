import './BoardCard.scss'
import { TaskCard } from '../task/TaskCard'
import useProjects from '../../store/Projects.store'
import { BoardContext } from '../../context/BoardContext'
import { useShallow } from 'zustand/shallow'
import { useBoard } from '../../hooks/useBoard'

type Props = {
    boardId: string
}

export const BoardCard = ({ boardId }: Props) => {
    const { board, remove } = useBoard(boardId)
    const taskIds = useProjects(useShallow(s =>
        Object.values(s.tasks)
            .filter(t => t.boardId === boardId)
            .map(t => t.id)
    ))

    return (
        <BoardContext.Provider value={boardId}>
            <div className="board-card">
                <h1 className='board-card__title'>
                    <span>{board.title}</span>
                    <span className='x' onClick={remove}>×</span>
                </h1>
                <div className="board-card__tasks-box">
                    {taskIds.length > 0
                        ? taskIds.map(taskId => (
                            <TaskCard key={taskId} taskId={taskId} />
                        ))
                        : <span>Задач пока нет</span>
                    }
                </div>
            </div>
        </BoardContext.Provider>
    )
}