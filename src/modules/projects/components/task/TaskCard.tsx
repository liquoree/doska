import './TaskCard.scss'
import { formatDateTime } from '../../utils/formatDateTime'
import { useState } from 'react'
import { RespModal } from '../modal/RespModal'
import { useTask } from '../../hooks/useTask'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = { taskId: string }

export const TaskCard = ({ taskId }: Props) => {
  const { task, remove, responsible, toggleStatus, changeTitle } = useTask(taskId)
  const [titleChange, setTitleChange] = useState(false)
  const [inputValue, setInputValue] = useState(task?.title ?? '')
  const [showRespModal, setShowRespModal] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: taskId })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const onInputSubmit = () => { changeTitle(inputValue); setTitleChange(false) }

  if (!task) return null

  return (
    // setNodeRef + style — позиционирование, attributes + listeners — drag-хэндлеры
    <div ref={setNodeRef} style={style} className="task-card" {...attributes} {...listeners}>
      <span className='x' onClick={remove}>×</span>
      <div className="task-card__title-box">
        <div
          className={`task-card__title-box--status${task.isCompleted ? ' completed' : ''}`}
          onClick={toggleStatus}
        />
        <div className="task-card__title-box--text" onDoubleClick={() => setTitleChange(true)}>
          {!titleChange
            ? task.title
            : <input
                className='task-card__title-box--text--change-input'
                autoFocus
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onInputSubmit()}
                onBlur={() => { setInputValue(task.title); setTitleChange(false) }}
              />
          }
        </div>
      </div>
      <div className="task-card__info-box">
        <div className="task-card__info-box--date">{formatDateTime(task.createdAt)}</div>
        <div className="task-card__info-box--responsible">
          {responsible.slice(0, 2).map(user => (
            <div key={user.id} className='task-card__info-box--responsible-item'>{user.nickname}</div>
          ))}
          {responsible.length > 2 &&
            <div className='task-card__info-box--responsible-item plus'>+{responsible.length - 2}</div>
          }
          <span className='opts' onClick={() => setShowRespModal(true)}>⋮</span>
        </div>
      </div>
      {showRespModal && <RespModal taskId={taskId} onClose={() => setShowRespModal(false)} />}
    </div>
  )
}