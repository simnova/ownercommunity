import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
 
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);


export const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIMEZONE = 'America/New_York';

export class CustomDateInUsEasternTz {

  constructor(private readonly _dateString: string) {
    if (!dayjs(this._dateString, DATE_FORMAT, true).isValid()) {
      throw new Error('Invalid date string');
    }
  }
  
  public get dateString(): string {
    return this._dateString;
  }

  public get date(): Date {
    return dayjs(this._dateString, DATE_FORMAT).tz(DATE_TIMEZONE, true).toDate();
  }

  public get startOfDayTimestamp(): Date {
    return dayjs(this._dateString, DATE_FORMAT).tz(DATE_TIMEZONE, true).toDate();
  }

  public get endOfDayTimestamp(): Date {    
    return dayjs(this.startOfDayTimestamp).add(1, 'day').subtract(1, 'millisecond').toDate();
  }

  static createFromDate(date: Date): CustomDateInUsEasternTz {
    return new CustomDateInUsEasternTz(dayjs(date).tz(DATE_TIMEZONE, true).format(DATE_FORMAT));
  }

}