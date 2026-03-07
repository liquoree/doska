import type { Project, Board, Task, User } from "../types/types";

const randomDateTime = (
    from = new Date(2023, 0, 1),
    to = new Date(2026, 11, 31)
): string => {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime)).toISOString();
};

export const MockUsers: Record<string, User> = {
    // проект №1
    "129479234": { id: "129479234", nickname: "anton",       projectIds: ["2342352353"] },
    "0987":      { id: "0987",      nickname: "liquoree",    projectIds: ["2342352353"] },
    "345622":    { id: "345622",    nickname: "user5678",    projectIds: ["2342352353"] },
    "778899":    { id: "778899",    nickname: "misha",       projectIds: ["2342352353"] },
    "111222":    { id: "111222",    nickname: "dima",        projectIds: ["2342352353"] },
    // проект демка
    "223344":    { id: "223344",    nickname: "roma",        projectIds: ["234234256"] },
    "445566":    { id: "445566",    nickname: "alisa",       projectIds: ["234234256"] },
    "999111":    { id: "999111",    nickname: "nikita",      projectIds: ["234234256"] },
    "888777":    { id: "888777",    nickname: "tester01",    projectIds: ["234234256"] },
    // english name of proj
    "321654":    { id: "321654",    nickname: "mark",        projectIds: ["985037503476903"] },
    "987654":    { id: "987654",    nickname: "john",        projectIds: ["985037503476903"] },
    "456123":    { id: "456123",    nickname: "kate",        projectIds: ["985037503476903"] },
    // crm system
    "101010":    { id: "101010",    nickname: "backendmax",  projectIds: ["111222333444"] },
    "202020":    { id: "202020",    nickname: "frontendira", projectIds: ["111222333444"] },
    "303030":    { id: "303030",    nickname: "qacat",       projectIds: ["111222333444"] },
    // mobile app
    "404040":    { id: "404040",    nickname: "uxlena",      projectIds: ["555666777888"] },
    "505050":    { id: "505050",    nickname: "reactnate",   projectIds: ["555666777888"] },
    "606060":    { id: "606060",    nickname: "metricfox",   projectIds: ["555666777888"] },
};

export const MockTasks: Record<string, Task> = {
    "100001": { id: "100001", boardId: "09273905238", title: "собрать требования по проекту",       isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["129479234"] },
    "100002": { id: "100002", boardId: "09273905238", title: "подготовить структуру папок",         isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["0987"] },
    "2837023":  { id: "2837023",  boardId: "69238469238", title: "сделать че нибудь",               isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["129479234", "0987"] },
    "73957235": { id: "73957235", boardId: "69238469238", title: "еще задача с мега длинным названием, чтобы проверить на переполнение блок короче, ну вот такой прикол", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["345622"] },
    "25343600": { id: "25343600", boardId: "69238469238", title: "ну и такая мини-задача",          isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["345622"] },
    "25343601": { id: "25343601", boardId: "69238469238", title: "сверстать карточку задачи",       isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["778899"] },
    "25343602": { id: "25343602", boardId: "69238469238", title: "добавить фильтрацию задач по статусу", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["111222", "0987"] },
    "55520001": { id: "55520001", boardId: "55510001",    title: "инициализировать проект",         isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["129479234"] },
    "55520002": { id: "55520002", boardId: "55510001",    title: "подключить роутинг",              isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["778899"] },

    "70020001": { id: "70020001", boardId: "70010001", title: "придумать главную фичу демо-проекта", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["223344"] },
    "70020002": { id: "70020002", boardId: "70010001", title: "сделать moodboard по интерфейсу",     isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["445566"] },
    "70020003": { id: "70020003", boardId: "70010002", title: "настроить авторизацию",               isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["223344", "999111"] },
    "70020004": { id: "70020004", boardId: "70010002", title: "сделать страницу проекта",            isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["445566"] },
    "70020005": { id: "70020005", boardId: "70010003", title: "проверить адаптив на мобилках",       isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["888777"] },

    "80020001": { id: "80020001", boardId: "80010001", title: "create landing page copy",  isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["321654"] },
    "80020002": { id: "80020002", boardId: "80010001", title: "prepare api contract",      isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["987654"] },
    "80020003": { id: "80020003", boardId: "80010002", title: "review typography and spacing", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["456123", "321654"] },

    "90020001": { id: "90020001", boardId: "90010001", title: "спроектировать сущность клиента",    isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["101010"] },
    "90020002": { id: "90020002", boardId: "90010001", title: "сделать таблицу клиентов",           isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["202020"] },
    "90020003": { id: "90020003", boardId: "90010002", title: "добавить поиск по email и телефону", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["202020", "303030"] },
    "90020004": { id: "90020004", boardId: "90010002", title: "реализовать форму создания сделки",  isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["101010"] },
    "90020005": { id: "90020005", boardId: "90010002", title: "подключить валидацию формы",         isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["202020"] },

    "91020001": { id: "91020001", boardId: "91010001", title: "нарисовать экран онбординга",        isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["404040"] },
    "91020002": { id: "91020002", boardId: "91010001", title: "собрать ui kit для приложения",      isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["404040"] },
    "91020003": { id: "91020003", boardId: "91010002", title: "подключить навигацию между экранами",isCompleted: true,  createdAt: randomDateTime(), responsibleIds: ["505050"] },
    "91020004": { id: "91020004", boardId: "91010002", title: "сделать экран статистики",           isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["505050", "606060"] },
    "91020005": { id: "91020005", boardId: "91010002", title: "добавить локальное хранилище",       isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["505050"] },
    "91020006": { id: "91020006", boardId: "91010003", title: "подготовить иконки и splash screen", isCompleted: false, createdAt: randomDateTime(), responsibleIds: ["404040"] },
};

export const MockBoards: Record<string, Board> = {
    "09273905238": { id: "09273905238", projectId: "2342352353",    title: "backlog" },
    "69238469238": { id: "69238469238", projectId: "2342352353",    title: "крутая доска" },
    "55510001":    { id: "55510001",    projectId: "2342352353",    title: "done" },
    "70010001":    { id: "70010001",    projectId: "234234256",     title: "ideas" },
    "70010002":    { id: "70010002",    projectId: "234234256",     title: "in progress" },
    "70010003":    { id: "70010003",    projectId: "234234256",     title: "qa" },
    "80010001":    { id: "80010001",    projectId: "985037503476903", title: "todo" },
    "80010002":    { id: "80010002",    projectId: "985037503476903", title: "review" },
    "90010001":    { id: "90010001",    projectId: "111222333444",  title: "backlog" },
    "90010002":    { id: "90010002",    projectId: "111222333444",  title: "current sprint" },
    "91010001":    { id: "91010001",    projectId: "555666777888",  title: "design" },
    "91010002":    { id: "91010002",    projectId: "555666777888",  title: "development" },
    "91010003":    { id: "91010003",    projectId: "555666777888",  title: "release" },
};

export const MockProjects: Record<string, Project> = {
    "2342352353":     { id: "2342352353",     title: "проект №1",       slug: "proj1" },
    "234234256":      { id: "234234256",      title: "проект демка",    slug: "demo-proj",  description: "ну обычный демо-проект, пусть описание будет подлиннее" },
    "985037503476903":{ id: "985037503476903",title: "english name of proj", slug: "eng-proj", description: "optional desc bro" },
    "111222333444":   { id: "111222333444",   title: "crm system",      slug: "crm-system", description: "внутренний проект для менеджеров и продаж" },
    "555666777888":   { id: "555666777888",   title: "mobile app",      slug: "mobile-app", description: "трекер привычек для ios и android" },
};