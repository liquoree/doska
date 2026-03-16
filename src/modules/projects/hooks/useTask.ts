import useProjects from '../store/Projects.store'
import { useProjectContext } from '../context/ProjectContext'
import { useShallow } from 'zustand/react/shallow'
import { updateTask as updateTaskApi, deleteTask, addResponsible, removeResponsible } from '@/api/tasks'

export const useTask = (taskId: string) => {
    const projectId = useProjectContext()
    const updateTask = useProjects(state => state.updateTask)
    const removeTask = useProjects(state => state.removeTask)
    const task = useProjects(state => state.tasks[taskId])
    const responsible = useProjects(useShallow(state =>
        task.responsibleIds.map(id => state.users[id]).filter(Boolean)
    ))

    return {
        task,
        responsible,
        toggleStatus: async () => {
            await updateTaskApi(projectId, taskId, { isCompleted: !task.isCompleted })
            updateTask(taskId, t => { t.isCompleted = !t.isCompleted })
        },
        changeTitle: async (title: string) => {
            await updateTaskApi(projectId, taskId, { title })
            updateTask(taskId, t => { t.title = title })
        },
        addResponsible: async (userId: string) => {
            await addResponsible(projectId, taskId, userId)
            updateTask(taskId, t => { t.responsibleIds.push(userId) })
        },
        removeResponsible: async (userId: string) => {
            await removeResponsible(projectId, taskId, userId)
            updateTask(taskId, t => {
                t.responsibleIds = t.responsibleIds.filter(id => id !== userId)
            })
        },
        remove: async () => {
            await deleteTask(projectId, taskId)
            removeTask(taskId)
        },
    }
}