export type Project = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    boards: Board[]
    users: User[]
}

export type Board = {
    id: string;
    title: string;
    tasks: Task[];
}

export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
    responsible: User[];
    createdAt: string;
}

export type User = {
    id: string;
    nickname: string;
}

