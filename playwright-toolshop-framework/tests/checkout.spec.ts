import { expect, test } from '../fixtures/compositionFixture.js';
import { generateEmail } from '../utils/loginHelper.js';

test.describe('Checkout', () => {
  test('existing user signs in during checkout', async ({ registeredUser, basketPage, checkoutPage }) => {

    // await basketPage.gotoCheckout();
    // console.log(await basketPage.page.url());
    // await basketPage.proceedButton.click();
    // console.log(await checkoutPage.page.url());
    await Promise.all([
      checkoutPage.loginForm.login(registeredUser.email, registeredUser.password),
      checkoutPage.waitWhileUserLogged(),
    ]);
    // console.log(await checkoutPage.page.url());

    await expect(checkoutPage.checkoutMessage).toBeVisible();
  });

  test('guest checkout', async ({ checkoutPage }) => {
    await checkoutPage.continueAsGuest();
    const email = generateEmail();
    await checkoutPage.guestForm.register(email);

    await expect(checkoutPage.guestMessage).toBeVisible();
  });

  test('login fails with invalid credentials', async ({ registeredUser, checkoutPage }) => {
    await checkoutPage.loginForm.login(registeredUser.email, 'WrongPassword123!');

    await expect(checkoutPage.getLoginError()).toContainText('Invalid email or password');
  });
});
