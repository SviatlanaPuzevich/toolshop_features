import { mergeTests } from '@playwright/test';
import { test as registerTest } from './registerFixture.js';
import { test as checkoutFlowTest } from './checkoutFlowFixture.js';

export const test = mergeTests(registerTest, checkoutFlowTest);

export { expect } from '@playwright/test';
