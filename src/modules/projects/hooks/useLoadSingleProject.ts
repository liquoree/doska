import { useEffect, useState } from 'react'
import { getBoards } from '@/api/boards'
import { getTasks } from '@/api/tasks'
import { getMembers, getProjects } from '@/api/projects'
import useProjects from '../store/Projects.store'

export const useLoadSingleProject = (projectId: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addBoard, addTask, addUser, clearProject, addProject } = useProjects()

  const load = async (initial = false) => {
    const token = localStorage.getItem('token')
    if (!token) {
      if (initial) setLoading(false)
      return
    }
    try {
      if (initial) {
        // загружаем список проектов если стор пустой
        const projects = useProjects.getState().projects
        if (Object.keys(projects).length === 0) {
          const { data } = await getProjects()
          console.log('PROJECTS:', data)
          data.forEach(addProject)
        }
        clearProject(projectId)
      }

      const [{ data: boards }, { data: tasks }, { data: members }] = await Promise.all([
        getBoards(projectId),
        getTasks(projectId),
        getMembers(projectId),
      ])

      if (!initial) clearProject(projectId)

      boards.forEach(addBoard)
      tasks.forEach(addTask)
      members.forEach(addUser)
    } catch {
      setError('Ошибка загрузки проекта')
    } finally {
      if (initial) setLoading(false)
    }
  }

  useEffect(() => {
    load(true)

    const interval = setInterval(() => load(false), 5000)

    return () => clearInterval(interval)
  }, [projectId])

  return { loading, error, refetch: () => load(false) }
}