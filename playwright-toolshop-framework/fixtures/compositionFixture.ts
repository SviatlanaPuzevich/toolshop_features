import { mergeTests } from '@playwright/test';
import { test as registerTest } from './registerFixture.js';
import { test as checkoutTest } from './checkoutFixture.js';

export const test = mergeTests(registerTest, checkoutTest);

export { expect } from '@playwright/test';
