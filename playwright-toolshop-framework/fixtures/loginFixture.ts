import { test as registerTest } from './registerFixture.js';
import { LoginPage } from '../pages/LoginPage.js';
import { User } from '../types/types.js';

export type LoginFixtures = {
  loggedInUser: User;
  loginPage: LoginPage;
};

export const test = registerTest.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  loggedInUser: async ({ page, registeredUser }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);

    await use(registeredUser);
  },
});
