import { CheckoutFlow, UserRegistrationFlow } from '../../business/index.js';
import { test as pagesTest } from './pages.fixture.js';

export type FlowFixtures = {
  checkoutFlow: CheckoutFlow;
  userRegistrationFlow: UserRegistrationFlow;
};

/** Business flows, wired up with the page objects they drive. */
export const test = pagesTest.extend<FlowFixtures>({
  checkoutFlow: async ({ catalogPage, productPage, cartPage }, use) => {
    await use(new CheckoutFlow(catalogPage, productPage, cartPage));
  },
  userRegistrationFlow: async ({ registerPage, loginPage }, use) => {
    await use(new UserRegistrationFlow(registerPage, loginPage));
  },
});
