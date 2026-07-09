import {test as base} from '@playwright/test';
import {RegisterPage} from '../pages/RegisterPage';
import {User} from '../types/types';
import {generateStrongPassword} from '../utils/passwordHelper';

type RegisterFixture = {
    registeredUser: User;
};

export const test = base.extend<RegisterFixture>({
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
});

export {expect} from '@playwright/test';