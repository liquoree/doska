import type { Task } from '@/shared/types/types'
import client from './client'

export const getTasks = (projectId: string) => client.get(`/projects/${projectId}/tasks`)
export const createTask = (projectId: string, title: string, board_id: string) => client.post(`/projects/${projectId}/tasks`, { title, board_id })
export const updateTask = (projectId: string, taskId: string, data: Partial<Task>) =>
    client.patch(`/projects/${projectId}/tasks/${taskId}`, {
        title: data.title,
        is_completed: data.isCompleted,
        board_id: data.boardId,
    })
export const deleteTask = (projectId: string, taskId: string) => client.delete(`/projects/${projectId}/tasks/${taskId}`)
export const addResponsible = (projectId: string, taskId: string, userId: string) => client.post(`/projects/${projectId}/tasks/${taskId}/responsible/${userId}`)
export const removeResponsible = (projectId: string, taskId: string, userId: string) => client.delete(`/projects/${projectId}/tasks/${taskId}/responsible/${userId}`)