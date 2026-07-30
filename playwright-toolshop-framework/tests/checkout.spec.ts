import { expect, test } from '../fixtures/compositionFixture.js';
import { CheckoutLoginForm } from '../components/CheckoutLoginForm.js';
import { CheckoutGuestForm } from '../components/CheckoutGuestForm.js';
import { generateEmail } from '../utils/loginHelper.js';

test.describe('Checkout', () => {
  test('existing user signs in during checkout', async ({ registeredUser, checkoutPage, page }) => {
    const checkoutLoginForm = new CheckoutLoginForm(page);
    await checkoutLoginForm.login(registeredUser.email, registeredUser.password);

    await expect(checkoutPage.checkoutMessage).toBeVisible();
  });

  test('guest checkout', async ({ page, checkoutPage }) => {
    await checkoutPage.continueAsGuest();
    const checkoutGuestForm = new CheckoutGuestForm(page);
    const email = generateEmail();
    await checkoutGuestForm.register(email);

    await expect(checkoutPage.guestMessage).toBeVisible();
  });

  test('login fails with invalid credentials', async ({ registeredUser, checkoutPage, page }) => {
    const checkoutLoginFrom = new CheckoutLoginForm(page);
    await checkoutLoginFrom.login(registeredUser.email, 'WrongPassword123!');

    await expect(checkoutPage.getError('login')).toContainText('Invalid email or password');
  });
});
