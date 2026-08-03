import { UserFactory } from '../../business/index.js';
import { expect, test } from '../fixtures/index.js';

const WRONG_PASSWORD = 'WrongPassword123!';

test.describe('Checkout', () => {
  test('should let a registered customer sign in', async ({
    registeredUser,
    checkoutFlow,
    checkoutPage,
  }) => {
    await checkoutFlow.startCheckoutWithFirstProduct();

    await checkoutPage.signIn(registeredUser);

    await expect(checkoutPage.signedInMessage).toBeVisible();
  });

  test('should let a shopper continue as guest', async ({ checkoutFlow, checkoutPage }) => {
    await checkoutFlow.startCheckoutWithFirstProduct();

    await checkoutPage.continueAsGuest(UserFactory.createGuestContact());

    await expect(checkoutPage.guestMessage).toBeVisible();
  });

  test('should reject a wrong password', async ({ registeredUser, checkoutFlow, checkoutPage }) => {
    await checkoutFlow.startCheckoutWithFirstProduct();

    await checkoutPage.signIn({ email: registeredUser.email, password: WRONG_PASSWORD });

    await expect(checkoutPage.loginError).toContainText('Invalid email or password');
  });
});
