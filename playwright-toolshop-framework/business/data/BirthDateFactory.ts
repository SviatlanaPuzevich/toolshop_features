import { DateUtils } from '../../core/index.js';

/** Birth dates around the minimum age the shop requires from its customers. */
export class BirthDateFactory {
  public static readonly MINIMUM_AGE_IN_YEARS = 18;

  /**
   * Birth date of a customer who reaches the minimum age exactly `dayOffset` days
   * from today: a negative offset makes the customer old enough, a positive one too young.
   */
  public static forMinimumAge(dayOffset = 0): string {
    const dateOfMinimumAge = DateUtils.addYears(new Date(), -BirthDateFactory.MINIMUM_AGE_IN_YEARS);

    return DateUtils.toIsoDate(DateUtils.addDays(dateOfMinimumAge, dayOffset));
  }

  /** Birth date of a customer who is comfortably above the minimum age. */
  public static ofAdult(): string {
    return BirthDateFactory.forMinimumAge(-BirthDateFactory.MINIMUM_AGE_IN_YEARS * 365);
  }
}
