import { RegistrationData, User } from '../models/User.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { UserFactory } from '../data/UserFactory.js';

/** Creates shop accounts for tests that need an existing customer. */
export class UserRegistrationFlow {
  constructor(
    private readonly registerPage: RegisterPage,
    private readonly loginPage: LoginPage,
  ) {}

  /**
   * Registers a new customer and returns its credentials. The shop redirects to the login
   * page once the account exists, which is awaited so the account can be used right away.
   */
  public async registerNewUser(overrides: Partial<RegistrationData> = {}): Promise<User> {
    const registrationData = UserFactory.createRegistrationData(overrides);

    await this.registerPage.open();
    await this.registerPage.register(registrationData);
    await this.loginPage.waitUntilOpened();

    return { email: registrationData.email, password: registrationData.password };
  }
}
