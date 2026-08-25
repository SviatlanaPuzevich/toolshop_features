import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { User } from '../types/types.js';
import { generateEmail, generateStrongPassword } from '../utils/loginHelper.js';

export type RegisterFixtures = {
  registeredUser: User;
  registrationPage: RegisterPage;
};

export const test = base.extend<RegisterFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegisterPage(page);

    await registrationPage.open();

    await use(registrationPage);
  },

  registeredUser: async ({ page }, use) => {
    const email = generateEmail();
    const password = generateStrongPassword(8);

    const registrationPage = new RegisterPage(page);

    await registrationPage.open();
    await registrationPage.fillValidForm(password, email);
    await registrationPage.submit();

    await page.waitForURL(/.*\/auth\/login/, {
      timeout: 10000,
    });

    await use({ email, password });
  },
});

export { expect } from '@playwright/test';