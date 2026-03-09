import { useState } from 'react'
import { BaseModal } from "@/shared/components/modal/BaseModal"
import useProjects from '../../store/Projects.store'
import { useShallow } from 'zustand/shallow'
import type { Task, User } from '@/shared/types/types'
import { v4 as uuidv4 } from 'uuid'
import './Modal.scss'
import { useProjectContext } from '../../context/ProjectContext'

type Props = {
    onClose: () => void
    boardId: string
}

const validate = (title: string, existingTitles: string[]): string => {
    if (title.length > 25) return 'Название не должно превышать 25 символов'
    if (existingTitles.includes(title.trim().toLowerCase())) return 'Задача с таким названием уже существует'
    return ''
}

export const AddTaskModal = ({ onClose, boardId }: Props) => {
    const projectId = useProjectContext()
    const addTask = useProjects(s => s.addTask)

    const existingTitles = useProjects(useShallow(s =>
        (Object.values(s.tasks) as Task[])
            .filter(t => t.boardId === boardId)
            .map(t => t.title.toLowerCase())
    ))
    const projectUsers = useProjects(useShallow(s =>
        (Object.values(s.users) as User[]).filter(u => u.projectIds?.includes(projectId))
    ))

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const selectedUsers = projectUsers.filter(u => selectedIds.includes(u.id))
    const availableUsers = projectUsers.filter(u => !selectedIds.includes(u.id))

    const addResponsible = (userId: string) => setSelectedIds(prev => [...prev, userId])
    const removeResponsible = (userId: string) => setSelectedIds(prev => prev.filter(id => id !== userId))

    const onSubmit = async () => {
        const err = validate(title, existingTitles)
        if (err) { setError(err); return }

        setLoading(true)
        try {
            const task: Task = {
                id: uuidv4(),
                title: title.trim(),
                boardId,
                isCompleted: false,
                responsibleIds: selectedIds,
                createdAt: new Date().toISOString(),
            }
            addTask(task)
            onClose()
        } catch {
            setError('Что-то пошло не так, попробуйте снова')
        } finally {
            setLoading(false)
        }
    }

    return (
        <BaseModal
            title="Добавление задачи"
            btnText="Добавить"
            btnDisabled={!title.trim()}
            btnLoading={loading}
            onClose={onClose}
            onBtnClick={onSubmit}
        >
            <div className="modal-form">
                <input
                    className='modal-input'
                    placeholder='Название задачи'
                    value={title}
                    onChange={e => { setTitle(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && !!title.trim() && !loading && onSubmit()}
                    disabled={loading}
                    autoFocus
                />
                {error && <div className='modal-error'>{error}</div>}

                <div className="users-box">
                    <div className="resp-users users-wrapper">
                        <span className="small-header">Ответственные</span>
                        <div className="users-list">
                            {selectedUsers.length > 0
                                ? selectedUsers.map(user => (
                                    <div className="user" key={user.id}>
                                        <span>{user.nickname}</span>
                                        <button style={{ color: 'red' }} onClick={() => removeResponsible(user.id)}>✕</button>
                                    </div>
                                ))
                                : <span style={{ color: '#0000007a' }}>Не назначены</span>
                            }
                        </div>
                    </div>
                    <div className="other-users users-wrapper">
                        <span className="small-header">Добавить</span>
                        <div className="users-list">
                            {availableUsers.length > 0
                                ? availableUsers.map(user => (
                                    <div className="user" key={user.id}>
                                        <span>{user.nickname}</span>
                                        <button style={{ fontSize: '28px' }} onClick={() => addResponsible(user.id)}>+</button>
                                    </div>
                                ))
                                : <span style={{ color: '#0000007a' }}>{'Свободных юзеров не осталось :)'}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>
    )
}