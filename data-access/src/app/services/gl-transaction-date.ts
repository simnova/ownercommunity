import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
 
dayjs.extend(customParseFormat);

export const GL_TRANSACTION_DATE_FORMAT = 'YYYY-MM-DD';

export class GlTransactionDate {

  constructor(private readonly _dateString: string) {
    if (!dayjs(this._dateString, GL_TRANSACTION_DATE_FORMAT, true).isValid()) {
      throw new Error('Invalid date string');
    }
  }
  
  public get dateString(): string {
    return this._dateString;
  }

  public get date(): Date {
    return dayjs(this._dateString, GL_TRANSACTION_DATE_FORMAT).toDate();
  }
}