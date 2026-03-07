export type User = {
    id: string
    nickname: string
    projectIds?: string[]
}

export type Task = {
    id: string
    title: string
    isCompleted: boolean
    responsibleIds: string[]
    createdAt: string
    boardId: string
}

export type Board = {
    id: string
    title: string
    projectId: string
}

export type Project = {
    id: string
    title: string
    description?: string
    slug?: string
}