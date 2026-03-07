import useProjects from '../store/Projects.store'
import { useShallow } from 'zustand/react/shallow'

export const useTask = (taskId: string) => {
    const updateTask = useProjects(state => state.updateTask)
    const removeTask = useProjects(state => state.removeTask)
    const task = useProjects(state => state.tasks[taskId])
    const responsible = useProjects(useShallow(state =>
        task.responsibleIds.map(id => state.users[id]).filter(Boolean)
    ))

    return {
        task,
        responsible,
        toggleStatus: () => updateTask(taskId, t => { t.isCompleted = !t.isCompleted }),
        changeTitle: (title: string) => updateTask(taskId, t => { t.title = title }),
        addResponsible: (userId: string) => updateTask(taskId, t => { t.responsibleIds.push(userId) }),
        removeResponsible: (userId: string) => updateTask(taskId, t => {
            t.responsibleIds = t.responsibleIds.filter(id => id !== userId)
        }),
        remove: () => removeTask(taskId),
    }
}