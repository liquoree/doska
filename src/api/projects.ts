import type { Member, Project } from '@/shared/types/types'
import client from './client'

export const getProjects = () => client.get('/projects')
export const createProject = (data: Omit<Project, 'id'>) => client.post('/projects', data)
export const joinProject = (slug: string) => client.post('/projects/join', { slug })
export const leaveProject = (id: string) => client.delete(`/projects/${id}/leave`)
export const getMembers = (id: string) => client.get<Member[]>(`/projects/${id}/members`)
