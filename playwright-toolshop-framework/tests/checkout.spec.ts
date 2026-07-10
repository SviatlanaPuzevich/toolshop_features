import {expect, test} from '../fixtures/compositionFixture';
import {CheckoutLoginForm} from "../components/CheckoutLoginForm";
import {CheckoutGuestForm} from "../components/CheckoutGuestForm";
import {generateEmail} from "../utils/loginHelper";

test.describe('Checkout', () => {

    test('existing user signs in during checkout',
        async ({page, registeredUser, checkoutPage}) => {
            const checkoutLoginForm = new CheckoutLoginForm(page);
            await checkoutLoginForm.login(registeredUser.email, registeredUser.password);

            await expect(checkoutPage.checkoutMessage).toBeVisible();
        });

    test('guest checkout',
        async ({page, checkoutPage}) => {
            await checkoutPage.continueAsGuest();
            const checkoutGuestForm = new CheckoutGuestForm(page);
            const email = generateEmail();
            await checkoutGuestForm.register(email)

            await expect(checkoutPage.guestMessage).toBeVisible()

        });


    test('login fails with invalid credentials',
        async ({registeredUser, checkoutPage, page}) => {
            const checkoutLoginFrom = new CheckoutLoginForm(page)
            await checkoutLoginFrom.login(registeredUser.email, 'WrongPassword123!');

            await expect(checkoutPage.getError('login')).toContainText('Invalid email or password');

        });

});