export const getDateAsString = (timestamp: number | null): string => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } else {
    return "Нет ближайших задач";
  }
};
