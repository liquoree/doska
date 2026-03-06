import type { Project } from "../types/types";

const randomDateTime = (
    from = new Date(2023, 0, 1),
    to = new Date(2026, 11, 31)
): string => {
    const fromTime = from.getTime();
    const toTime = to.getTime();

    // генерируем случайный timestamp между датами
    const randomTime = fromTime + Math.random() * (toTime - fromTime);

    // возвращаем стандартную строку даты и времени
    return new Date(randomTime).toISOString();
};

export const MockProjects: Project[] = [
    {
        id: "2342352353",
        title: "проект №1",
        slug: "proj1",
        users: [
            {
                id: "129479234",
                nickname: "anton",
            },
            {
                id: "0987",
                nickname: "liquoree",
            },
            {
                id: "345622",
                nickname: "user5678",
            },
            {
                id: "778899",
                nickname: "misha",
            },
            {
                id: "111222",
                nickname: "dima",
            },
        ],
        boards: [
            {
                id: "09273905238",
                title: "backlog",
                tasks: [
                    {
                        id: "100001",
                        title: "собрать требования по проекту",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "129479234",
                                nickname: "anton",
                            },
                        ],
                    },
                    {
                        id: "100002",
                        title: "подготовить структуру папок",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "0987",
                                nickname: "liquoree",
                            },
                        ],
                    },
                ],
            },
            {
                id: "69238469238",
                title: "крутая доска",
                tasks: [
                    {
                        id: "2837023",
                        title: "сделать че нибудь",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "129479234",
                                nickname: "anton",
                            },
                            {
                                id: "0987",
                                nickname: "liquoree",
                            },
                        ],
                    },
                    {
                        id: "73957235",
                        title: "еще задача с мега длинным названием, чтобы проверить на переполнение блок короче, ну вот такой прикол",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "345622",
                                nickname: "user5678",
                            },
                        ],
                    },
                    {
                        id: "25343600",
                        title: "ну и такая мини-задача",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "345622",
                                nickname: "user5678",
                            },
                        ],
                    },
                    {
                        id: "25343601",
                        title: "сверстать карточку задачи",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "778899",
                                nickname: "misha",
                            },
                        ],
                    },
                    {
                        id: "25343602",
                        title: "добавить фильтрацию задач по статусу",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "111222",
                                nickname: "dima",
                            },
                            {
                                id: "0987",
                                nickname: "liquoree",
                            },
                        ],
                    },
                ],
            },
            {
                id: "55510001",
                title: "done",
                tasks: [
                    {
                        id: "55520001",
                        title: "инициализировать проект",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "129479234",
                                nickname: "anton",
                            },
                        ],
                    },
                    {
                        id: "55520002",
                        title: "подключить роутинг",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "778899",
                                nickname: "misha",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "234234256",
        title: "проект демка",
        description: "ну обычный демо-проект, пусть описание будет подлиннее",
        slug: "demo-proj",
        users: [
            {
                id: "223344",
                nickname: "roma",
            },
            {
                id: "445566",
                nickname: "alisa",
            },
            {
                id: "999111",
                nickname: "nikita",
            },
            {
                id: "888777",
                nickname: "tester01",
            },
        ],
        boards: [
            {
                id: "70010001",
                title: "ideas",
                tasks: [
                    {
                        id: "70020001",
                        title: "придумать главную фичу демо-проекта",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "223344",
                                nickname: "roma",
                            },
                        ],
                    },
                    {
                        id: "70020002",
                        title: "сделать moodboard по интерфейсу",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "445566",
                                nickname: "alisa",
                            },
                        ],
                    },
                ],
            },
            {
                id: "70010002",
                title: "in progress",
                tasks: [
                    {
                        id: "70020003",
                        title: "настроить авторизацию",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "223344",
                                nickname: "roma",
                            },
                            {
                                id: "999111",
                                nickname: "nikita",
                            },
                        ],
                    },
                    {
                        id: "70020004",
                        title: "сделать страницу проекта",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "445566",
                                nickname: "alisa",
                            },
                        ],
                    },
                ],
            },
            {
                id: "70010003",
                title: "qa",
                tasks: [
                    {
                        id: "70020005",
                        title: "проверить адаптив на мобилках",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "888777",
                                nickname: "tester01",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "985037503476903",
        title: "english name of proj",
        description: "optional desc bro",
        slug: "eng-proj",
        users: [
            {
                id: "321654",
                nickname: "mark",
            },
            {
                id: "987654",
                nickname: "john",
            },
            {
                id: "456123",
                nickname: "kate",
            },
        ],
        boards: [
            {
                id: "80010001",
                title: "todo",
                tasks: [
                    {
                        id: "80020001",
                        title: "create landing page copy",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "321654",
                                nickname: "mark",
                            },
                        ],
                    },
                    {
                        id: "80020002",
                        title: "prepare api contract",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "987654",
                                nickname: "john",
                            },
                        ],
                    },
                ],
            },
            {
                id: "80010002",
                title: "review",
                tasks: [
                    {
                        id: "80020003",
                        title: "review typography and spacing",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "456123",
                                nickname: "kate",
                            },
                            {
                                id: "321654",
                                nickname: "mark",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "111222333444",
        title: "crm system",
        description: "внутренний проект для менеджеров и продаж",
        slug: "crm-system",
        users: [
            {
                id: "101010",
                nickname: "backendmax",
            },
            {
                id: "202020",
                nickname: "frontendira",
            },
            {
                id: "303030",
                nickname: "qacat",
            },
        ],
        boards: [
            {
                id: "90010001",
                title: "backlog",
                tasks: [
                    {
                        id: "90020001",
                        title: "спроектировать сущность клиента",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "101010",
                                nickname: "backendmax",
                            },
                        ],
                    },
                    {
                        id: "90020002",
                        title: "сделать таблицу клиентов",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "202020",
                                nickname: "frontendira",
                            },
                        ],
                    },
                ],
            },
            {
                id: "90010002",
                title: "current sprint",
                tasks: [
                    {
                        id: "90020003",
                        title: "добавить поиск по email и телефону",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "202020",
                                nickname: "frontendira",
                            },
                            {
                                id: "303030",
                                nickname: "qacat",
                            },
                        ],
                    },
                    {
                        id: "90020004",
                        title: "реализовать форму создания сделки",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "101010",
                                nickname: "backendmax",
                            },
                        ],
                    },
                    {
                        id: "90020005",
                        title: "подключить валидацию формы",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "202020",
                                nickname: "frontendira",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "555666777888",
        title: "mobile app",
        description: "трекер привычек для ios и android",
        slug: "mobile-app",
        users: [
            {
                id: "404040",
                nickname: "uxlena",
            },
            {
                id: "505050",
                nickname: "reactnate",
            },
            {
                id: "606060",
                nickname: "metricfox",
            },
        ],
        boards: [
            {
                id: "91010001",
                title: "design",
                tasks: [
                    {
                        id: "91020001",
                        title: "нарисовать экран онбординга",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "404040",
                                nickname: "uxlena",
                            },
                        ],
                    },
                    {
                        id: "91020002",
                        title: "собрать ui kit для приложения",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "404040",
                                nickname: "uxlena",
                            },
                        ],
                    },
                ],
            },
            {
                id: "91010002",
                title: "development",
                tasks: [
                    {
                        id: "91020003",
                        title: "подключить навигацию между экранами",
                        isCompleted: true,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "505050",
                                nickname: "reactnate",
                            },
                        ],
                    },
                    {
                        id: "91020004",
                        title: "сделать экран статистики",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "505050",
                                nickname: "reactnate",
                            },
                            {
                                id: "606060",
                                nickname: "metricfox",
                            },
                        ],
                    },
                    {
                        id: "91020005",
                        title: "добавить локальное хранилище",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "505050",
                                nickname: "reactnate",
                            },
                        ],
                    },
                ],
            },
            {
                id: "91010003",
                title: "release",
                tasks: [
                    {
                        id: "91020006",
                        title: "подготовить иконки и splash screen",
                        isCompleted: false,
                        createdAt: randomDateTime(),
                        responsible: [
                            {
                                id: "404040",
                                nickname: "uxlena",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];