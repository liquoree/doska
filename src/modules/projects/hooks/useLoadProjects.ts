import { useEffect, useState } from 'react'
import { getProjects } from '@/api/projects'
import useProjects from '../store/Projects.store'

export const useLoadProjects = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addProject } = useProjects()

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { data: projects } = await getProjects()
        projects.forEach(addProject)
      } catch (e) {
        setError('Ошибка загрузки проектов')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { loading, error }
}