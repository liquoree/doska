import { BaseModal } from "@/shared/components/modal/BaseModal"
import { useTask } from "../../hooks/useTask"
import { useProjectContext } from "../../context/ProjectContext"
import useProjects from "../../store/Projects.store"
import type { User } from "@/shared/types/types"
import { useShallow } from "zustand/shallow"
import './RespModal.scss'

type Props = {
    taskId: string
    onClose: () => void
}

export const RespModal = ({ taskId, onClose }: Props) => {
    const projectId = useProjectContext()
    const projectUsers = useProjects(useShallow(s =>
        (Object.values(s.users) as User[]).filter(u => u.projectIds?.includes(projectId))
    ))
    const { responsible, addResponsible, removeResponsible } = useTask(taskId)
    const responsibleIds = responsible.map(u => u.id)
    const availableUsers = projectUsers.filter(u => !responsibleIds.includes(u.id))

    return (
        <BaseModal title="Ответственные за задачу" btnText="ОК" onClose={onClose}>
            <div className="users-box">
                <div className="resp-users users-wrapper">
                    <span className="small-header" style={{marginBottom: '5px', fontWeight: '800'}}>Ответственные</span>
                    <div className="users-list">
                        {responsible.length > 0
                            ? responsible.map(user => (
                                <div className="user" key={user.id}>
                                    <span>{user.nickname}</span>
                                    <button style={{color: 'red'}} onClick={() => removeResponsible(user.id)}>✕</button>
                                </div>
                            ))
                            : <span style={{color: '#0000007a'}}>Задача простаивает..</span>
                        }
                    </div>
                </div>
                <div className="other-users users-wrapper">
                    <span className="small-header">Добавить ещё</span>
                    <div className="users-list">
                        {availableUsers.length > 0
                            ? availableUsers.map(user => (
                                <div className="user" key={user.id}>
                                    <span>{user.nickname}</span>
                                    <button style={{fontSize: '28px'}} onClick={() => addResponsible(user.id)}>+</button>
                                </div>
                            ))
                            : <span style={{color: '#0000007a', marginTop: '8px'}}>{'Свободных юзеров не осталось :)'}</span>
                        }
                    </div>
                </div>
            </div>
        </BaseModal>
    )
}