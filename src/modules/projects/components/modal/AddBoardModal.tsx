import { useState } from 'react'
import { BaseModal } from "@/shared/components/modal/BaseModal"
import { useProjectContext } from '../../context/ProjectContext'
import useProjects from '../../store/Projects.store'
import { useShallow } from 'zustand/shallow'
import type { Board } from '@/shared/types/types'
import { createBoard } from '@/api/boards'
import './Modal.scss'

type Props = {
    onClose: () => void
}

const validate = (title: string, existingTitles: string[]): string => {
    if (title.length > 25) return 'Название не должно превышать 25 символов'
    if (existingTitles.includes(title.trim().toLowerCase())) return 'Доска с таким названием уже существует'
    return ''
}

export const AddBoardModal = ({ onClose }: Props) => {
    const projectId = useProjectContext()
    const addBoard = useProjects(s => s.addBoard)

    const existingTitles = useProjects(useShallow(s =>
        (Object.values(s.boards) as Board[])
            .filter(b => b.projectId === projectId)
            .map(b => b.title.toLowerCase())
    ))

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        const err = validate(title, existingTitles)
        if (err) {
            setError(err)
            return
        }

        setLoading(true)
        try {
            const { data } = await createBoard(projectId, title.trim())
            addBoard(data)
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
            title="Добавление доски"
            btnText="Добавить"
            btnDisabled={!title.trim() || loading}
            btnLoading={loading}
            onClose={onClose}
            onBtnClick={onSubmit}
        >
            <div className="modal-form">
                <input
                    className="modal-input"
                    placeholder="Название доски *"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && title.trim() && !loading) {
                            onSubmit()
                        }
                    }}
                    disabled={loading}
                    autoFocus
                />
                {error && <div className="modal-error">{error}</div>}
            </div>
        </BaseModal>
    )
}