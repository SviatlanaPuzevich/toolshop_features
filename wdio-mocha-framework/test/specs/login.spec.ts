import { expect } from 'chai';
import { createUser } from '../../utils/registrationHelper';
import LoginPage from '../pageobjects/login.page';
import { User } from '../../types/types.ts';
import AccountPage from '../pageobjects/account.page.ts';

describe('User Sign In', () => {
  let user: User;

  before(async () => {
    user = await createUser();
  });

  beforeEach(async () => {
    await LoginPage.open();
  });

  it('Successful login with valid credentials', async () => {
    await LoginPage.login(user.email, user.password);

    await browser.waitUntil(async () => (await browser.getUrl()).includes('/account'), {
      timeout: 3000,
      timeoutMsg: 'URL have been not changed to /account during 3 seconds. ',
    });

    expect(await browser.getUrl()).to.include('/account');

    await AccountPage.signOut();
  });

  const requiredFieldsExamples = [
    { email: '', password: 'password1', id: 'email' },
    { email: 'user@test.com', password: '', id: 'password' },
  ];

  requiredFieldsExamples.forEach(({ email, password, id }) => {
    it(`Required fields validation (email: "${email}", password: "${password}")`, async () => {
      await LoginPage.login(email, password);

      const isDisplayed = await LoginPage.getError(id).isDisplayed();
      expect(isDisplayed).to.be.true;
    });
  });


    it(`Login fails with invalid credentials password)`, async () => {

      await LoginPage.login(user.email, "wrongPassword123!");

      const errorElement = LoginPage.getError('login');
      await errorElement.waitForDisplayed({ timeout: 3000 });

      const isDisplayed = await errorElement.isDisplayed();
      expect(isDisplayed).to.be.true;
    });

  it(`Login fails with invalid credentials email`, async () => {
    await LoginPage.login('unknownEmail@example.com', 'wrongPassword123!');

    const errorElement = LoginPage.getError('login');
    await errorElement.waitForDisplayed({ timeout: 3000 });

    const isDisplayed = await errorElement.isDisplayed();
    expect(isDisplayed).to.be.true;
  });
});
