import { expect, test } from '../fixtures/checkoutTest.js';
import { generateEmail } from '../utils/loginHelper.js';

test.describe('Checkout', () => {
  test('existing user signs in during checkout', async ({
    registeredUser,
    goToCheckout,
    checkoutPage,
  }) => {
    await goToCheckout();

    await Promise.all([
      checkoutPage.loginForm.login(registeredUser.email, registeredUser.password),
      checkoutPage.waitWhileUserLogged(),
    ]);

    await expect(checkoutPage.checkoutMessage).toBeVisible();
  });

  test('guest checkout', async ({ goToCheckout, checkoutPage }) => {
    await goToCheckout();

    await checkoutPage.continueAsGuest();

    const email = generateEmail();

    await checkoutPage.guestForm.register(email);

    await expect(checkoutPage.guestMessage).toBeVisible();
  });

  test('login fails with invalid credentials', async ({
    registeredUser,
    goToCheckout,
    checkoutPage,
  }) => {
    await goToCheckout();

    await checkoutPage.loginForm.login(registeredUser.email, 'WrongPassword123!');

    await expect(checkoutPage.getLoginError()).toContainText('Invalid email or password');
  });
});
