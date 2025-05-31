import { MONTH_NAMES } from "./dataStaticFixed";

export const FormatDateToDayMonth = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();

    const month = MONTH_NAMES[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month}, ${year}`;
  };