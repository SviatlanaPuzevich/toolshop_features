import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { User } from '../types/types.js';
import { generateEmail, generateStrongPassword } from '../utils/loginHelper.js';

export type RegisterFixtures = {
  registeredUser: User;
  loggedInUser: User;
};

export const test = base.extend<RegisterFixtures>({
  registeredUser: async ({ page }, use) => {
    const email = generateEmail();
    const password = generateStrongPassword(8);

    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.fillValidForm(password, email);
    await registerPage.submit();
    // Wait for registration to actually complete (redirect to login) before the
    // user is used, otherwise the account may not exist yet when we sign in.
    await page.waitForURL(/.*\/auth\/login/, { timeout: 10000 });

    const user = { email, password };
    await use(user);
  },

  loggedInUser: async ({ page, registeredUser }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);

    await use(registeredUser);
  },
});

export { expect } from '@playwright/test';
