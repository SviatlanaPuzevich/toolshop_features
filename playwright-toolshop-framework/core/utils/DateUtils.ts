export class DateUtils {
  /** Formats a date as `YYYY-MM-DD` using the local time zone. */
  public static toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /** Returns a new date shifted by the given number of years. The argument is not modified. */
  public static addYears(date: Date, years: number): Date {
    const shiftedDate = new Date(date.getTime());
    shiftedDate.setFullYear(shiftedDate.getFullYear() + years);

    return shiftedDate;
  }

  /** Returns a new date shifted by the given number of days. The argument is not modified. */
  public static addDays(date: Date, days: number): Date {
    const shiftedDate = new Date(date.getTime());
    shiftedDate.setDate(shiftedDate.getDate() + days);

    return shiftedDate;
  }
}
