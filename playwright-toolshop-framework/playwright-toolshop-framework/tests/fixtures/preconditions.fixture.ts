import { ApiEndpoints, User } from '../../business/index.js';
import { RequestSpy } from '../../core/index.js';
import { test as flowsTest } from './flows.fixture.js';

export type PreconditionFixtures = {
  /** Customer that already has an account in the shop. */
  registeredUser: User;
  /** Records the search calls the shop sends while the test runs. */
  searchRequestSpy: RequestSpy;
};

export const test = flowsTest.extend<PreconditionFixtures>({
  registeredUser: async ({ userRegistrationFlow }, use) => {
    await use(await userRegistrationFlow.registerNewUser());
  },
  searchRequestSpy: async ({ page }, use) => {
    const spy = RequestSpy.watch(page, ApiEndpoints.productSearch);

    await use(spy);

    spy.stop();
  },
});
