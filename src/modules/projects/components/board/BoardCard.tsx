import type { Board } from '@/shared/types/types'
import './BoardCard.scss'
import { TaskCard } from '../task/TaskCard'
import useProjects from '../../store/Projects.store'

type Props = Board & {
    projectId: string
}

export const BoardCard = ({ id, title, tasks, projectId }: Props) => {
    const updateTask = useProjects(state => state.updateTask);

    const onToggleTaskStatus = (taskId: string) => {
        updateTask(projectId, id, taskId, task => {
            task.isCompleted = !task.isCompleted;
        });
    };

    const onChangeTaskTitle = (taskId: string, newTitle: string) => {
        updateTask(projectId, id, taskId, task => {
            task.title = newTitle;
        })
    }

    return(
        <div className="board-card">
            <h1 className='board-card__title'>{title}</h1>
            <div className="board-card__tasks-box"> 
            {tasks.length > 0
                ? tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        createdAt={task.createdAt}
                        isCompleted={task.isCompleted}
                        responsible={task.responsible}
                        onToggleStatus={() => onToggleTaskStatus(task.id)}
                        onChangeTitle={(newTitle) => onChangeTaskTitle(task.id, newTitle)}
                    />
                ))
                : <span>Задач пока нет</span>
            }
            </div>
        </div>
    )
}