/**
 * Single entry point for the specs. The fixtures are layered on top of each other:
 * page objects -> business flows -> ready made preconditions.
 */
export { test } from './preconditions.fixture.js';
export { expect } from '@playwright/test';
