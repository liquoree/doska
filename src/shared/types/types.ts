export type Project = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    boards?: Board[]
}

export type Board = {
    id: string;
    title: string;
    tasks?: Task[];
}

export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
    responsible: User[];
    createdAt: Date;
}

export type User = {
    id: string;
    nickname: string;
    fullname: string;
}