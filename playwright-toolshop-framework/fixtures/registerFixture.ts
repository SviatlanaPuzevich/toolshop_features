import {test as base} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';
import {LoginPage} from '../pages/LoginPage';
import {User} from '../types/types';
import {generateStrongPassword} from '../utils/passwordHelper';

type RegisterFixtures = {
    registeredUser: User;
    loggedInUser: User;
};

export const test = base.extend<RegisterFixtures>({
    registeredUser: async ({page}, use) => {
        const email = `user${Date.now()}@mail.com`;
        const password = generateStrongPassword(8);

        const registerPage = new RegisterPage(page);
        await registerPage.open();
        await registerPage.fillValidForm(password, email);
        await registerPage.submit();

        const user = {email, password};
        await use(user);
    },

    loggedInUser: async ({page, registeredUser}, use) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(registeredUser.email, registeredUser.password);

        await use(registeredUser);
    },
});

export {expect} from '@playwright/test';