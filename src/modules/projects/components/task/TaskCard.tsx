import type { Task } from '@/shared/types/types'
import './TaskCard.scss'
import { formatDateTime } from '../../utils/formatDateTime'
import { useState } from 'react'

type Props = Omit<Task, 'id'> & {
    onToggleStatus: () => void
    onChangeTitle: (newTitle: string) => void
}

export const TaskCard = ({ title, isCompleted, responsible, createdAt, onToggleStatus, onChangeTitle }: Props) => {
    const [titleChange, setTitleChange] = useState(false)
    const [inputValue, setInputValue] = useState(title)

    const onInputSubmit = () => {
        onChangeTitle(inputValue)
        setTitleChange(false)
    }

    return(
        <div className="task-card">
            <div className="task-card__title-box">
                <div
                    className={`task-card__title-box--status${isCompleted ? ' completed' : ''}`}
                    onClick={onToggleStatus}
                />
                <div className="task-card__title-box--text" onDoubleClick={() => setTitleChange(true)}>
                    {!titleChange
                        ? title
                        :
                            <input
                                className='task-card__title-box--text--change-input'
                                autoFocus
                                value={inputValue} 
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && onInputSubmit()}
                                onBlur={() => {
                                    setInputValue(title); // сбрасываем к исходному
                                    setTitleChange(false);
                                }}
                            />
                    }
                </div>
            </div>
            <div className="task-card__info-box">
                <div className="task-card__info-box--date">
                    {formatDateTime(createdAt)}
                </div>
                <div className="task-card__info-box--responsible">
                    {responsible.map((e, index) => 
                        <div key={index} className='task-card__info-box--responsible-item'>{e.nickname}</div>
                    )}
                </div>
            </div>
        </div>
    )
}