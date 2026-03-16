import { useState } from 'react'
import { BaseModal } from "@/shared/components/modal/BaseModal"
import useProjects from '../../store/Projects.store'
import { joinProject } from '@/api/projects'
import './Modal.scss'

type Props = {
    onClose: () => void
}

export const JoinProjectModal = ({ onClose }: Props) => {
    const addProject = useProjects(s => s.addProject)

    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            const { data: project } = await joinProject(slug.trim())
            addProject(project)
            onClose()
        } catch (err: any) {
            setError('Проект не найден')
        } finally {
            setLoading(false)
        }
    }

    return (
        <BaseModal
            title="Подключиться к проекту"
            btnText="Подключиться"
            btnDisabled={!slug.trim()}
            btnLoading={loading}
            onClose={onClose}
            onBtnClick={onSubmit}
        >
            <div className="modal-form">
                <input
                    className='modal-input'
                    placeholder='Slug проекта *'
                    value={slug}
                    onChange={e => { setSlug(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && !!slug.trim() && !loading && onSubmit()}
                    disabled={loading}
                    autoFocus
                />
                {error && <div className='modal-error'>{error}</div>}
            </div>
        </BaseModal>
    )
}