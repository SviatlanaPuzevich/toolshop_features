import { RandomDataGenerator } from '../../core/index.js';
import { GuestContact, RegistrationData, User } from '../models/User.js';
import { BirthDateFactory } from './BirthDateFactory.js';

/** Builds valid test data for the shop, with only the interesting values overridden. */
export class UserFactory {
  private static readonly DEFAULT_COUNTRY = 'Lithuania';

  public static createRegistrationData(
    overrides: Partial<RegistrationData> = {},
  ): RegistrationData {
    return {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: BirthDateFactory.ofAdult(),
      street: 'Main street',
      houseNumber: '10',
      postalCode: '12345',
      city: 'Vilnius',
      state: 'Vilnius',
      country: UserFactory.DEFAULT_COUNTRY,
      phone: '37061234567',
      ...UserFactory.createCredentials(),
      ...overrides,
    };
  }

  public static createCredentials(overrides: Partial<User> = {}): User {
    return {
      email: RandomDataGenerator.email(),
      password: RandomDataGenerator.password(),
      ...overrides,
    };
  }

  public static createGuestContact(overrides: Partial<GuestContact> = {}): GuestContact {
    return {
      email: RandomDataGenerator.email('guest'),
      firstName: 'Ann',
      lastName: 'Ivanova',
      ...overrides,
    };
  }
}
