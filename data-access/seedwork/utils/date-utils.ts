import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


const convertToStartOfDayEST = (date: Date): Date => {
  return date ? dayjs.tz(date, 'America/New_York').startOf('day').toDate() : null;
};

const getUtcDateString = (date: Date, format: string): string => {
  return dayjs(date).utc().format(format);
}

const addDaysToDate = (date: Date, numberOfDays: number): Date => {
  return dayjs(date).add(numberOfDays, 'day').toDate();
}

export const DateUtils = {
  convertToStartOfDayEST,
  getUtcDateString,
  addDaysToDate
}