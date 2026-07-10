import { test as base } from '@playwright/test';
import { registerFixtures, type RegisterFixtures } from './registerFixture';
import { checkoutFixtures, type CheckoutFixture } from './checkoutFixture';

export const test = base.extend<RegisterFixtures & CheckoutFixture>({
    ...registerFixtures,
    ...checkoutFixtures,
});

export { expect } from '@playwright/test';