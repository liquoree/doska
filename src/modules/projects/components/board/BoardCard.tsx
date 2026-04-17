import './BoardCard.scss'
import { TaskCard } from '../task/TaskCard'
import { BoardContext } from '../../context/BoardContext'
import { useBoard } from '../../hooks/useBoard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

type Props = {
  boardId: string
  taskIds: string[]
  onAddTask: (boardId: string) => void
}

export const BoardCard = ({ boardId, taskIds, onAddTask }: Props) => {
  const { board, remove } = useBoard(boardId)

  // useDroppable нужен чтобы пустая доска тоже была drop-зоной
  const { setNodeRef } = useDroppable({ id: boardId })

  return (
    <BoardContext.Provider value={boardId}>
      <div className="board-card">
        <h1 className='board-card__title'>
          <span>{board.title}</span>
          <span className='x' onClick={remove}>×</span>
        </h1>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <div className="board-card__tasks-box" ref={setNodeRef}>
            {taskIds.length > 0
              ? taskIds.map(taskId => <TaskCard key={taskId} taskId={taskId} />)
              : <span>Задач пока нет</span>
            }
          </div>
        </SortableContext>
        <button onClick={() => onAddTask(boardId)}>Добавить задачу</button>
      </div>
    </BoardContext.Provider>
  )
}