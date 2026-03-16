import client from './client'

export const getBoards = (projectId: string) => client.get(`/projects/${projectId}/boards`)
export const createBoard = (projectId: string, title: string) => client.post(`/projects/${projectId}/boards`, { title })
export const deleteBoard = (projectId: string, boardId: string) => client.delete(`/projects/${projectId}/boards/${boardId}`)