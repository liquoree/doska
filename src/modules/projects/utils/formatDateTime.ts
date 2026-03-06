export const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    // получаем части даты
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    // получаем части времени
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // собираем итоговую строку
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};