import useProjects from '../store/Projects.store'
import { useProjectContext } from '../context/ProjectContext'
import { useShallow } from 'zustand/react/shallow'
import { 
    updateTask as updateTaskApi, 
    deleteTask, 
    addResponsible as addResponsibleApi, 
    removeResponsible as removeResponsibleApi
} from '@/api/tasks'

export const useTask = (taskId: string) => {
    const projectId = useProjectContext()
    const updateTask = useProjects(state => state.updateTask)
    const removeTask = useProjects(state => state.removeTask)
    const task = useProjects(state => state.tasks[taskId])
    const responsible = useProjects(useShallow(state =>
        (task?.responsibleIds ?? []).map(id => state.users[id]).filter(Boolean)
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
            const { data } = await addResponsibleApi(projectId, taskId, userId)
            updateTask(taskId, t => { t.responsibleIds = data.responsibleIds })
        },
        removeResponsible: async (userId: string) => {
            const { data } = await removeResponsibleApi(projectId, taskId, userId)
            updateTask(taskId, t => { t.responsibleIds = data.responsibleIds })
        },
        remove: async () => {
            await deleteTask(projectId, taskId)
            removeTask(taskId)
        },
    }
}