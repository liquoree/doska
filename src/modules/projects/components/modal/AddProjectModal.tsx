import { useState } from 'react'
import { BaseModal } from "@/shared/components/modal/BaseModal"
import useProjects from '../../store/Projects.store'
import { useShallow } from 'zustand/shallow'
import { createProject } from '@/api/projects'
import type { Project } from '@/shared/types/types'
import './Modal.scss'

type Props = {
    onClose: () => void
}

const validate = (title: string, slug: string, desc: string, existingSlugs: string[]): string => {
    if (title.length > 25) return 'Название не должно превышать 25 символов'
    if (!slug) return 'Введите уникальный ник'
    if (slug.length > 25) return 'Ник не должен превышать 25 символов'
    if (desc.length > 50) return 'Описание не должно превышать 50 символов'
    if (slug && existingSlugs.includes(slug.trim().toLowerCase())) return 'Проект с таким ником уже существует'
    return ''
}

const formatNickname = (raw: string): string =>
    raw.trim().replace(/\s+/g, '-').toLowerCase()

export const AddProjectModal = ({ onClose }: Props) => {
    const addProject = useProjects(s => s.addProject)

    const existingSlugs = useProjects(useShallow(s =>
        Object.values(s.projects).map(p => p.slug?.toLowerCase()).filter(Boolean) as string[]
    ))

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        const err = validate(title, slug, description, existingSlugs)
        if (err) {
            setError(err)
            return
        }

        setLoading(true)
        try {
            const payload: Omit<Project, 'id'> = {
                title: title.trim(),
                slug: formatNickname(slug),
                description: description.trim() || undefined,
            }

            const { data } = await createProject(payload)
            addProject(data)
            onClose()
        } catch (err: any) {
            const message = err?.response?.data?.detail

            if (typeof message === 'string') {
                setError(message)
            } else {
                setError('Что-то пошло не так, попробуйте снова')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <BaseModal
            title="Новый проект"
            btnText="Создать"
            btnDisabled={!title.trim() || !slug.trim() || loading}
            btnLoading={loading}
            onClose={onClose}
            onBtnClick={onSubmit}
        >
            <div className="modal-form">
                <input
                    className="modal-input"
                    placeholder="Название проекта *"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && title.trim() && slug.trim() && !loading) {
                            onSubmit()
                        }
                    }}
                    disabled={loading}
                    autoFocus
                />
                <input
                    className="modal-input"
                    placeholder="Slug *"
                    value={slug}
                    onChange={e => {
                        setSlug(e.target.value)
                        setError('')
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && title.trim() && slug.trim() && !loading) {
                            onSubmit()
                        }
                    }}
                    disabled={loading}
                />
                <input
                    className="modal-input"
                    placeholder="Описание (необязательно)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={loading}
                />
                {error && <div className="modal-error">{error}</div>}
            </div>
        </BaseModal>
    )
}