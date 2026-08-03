import { EnvironmentVariables } from '../../core/index.js';

/** Single place where the framework settings and their defaults are defined. */
export const testConfig = {
  baseUrl: EnvironmentVariables.getString('BASE_URL', 'https://practicesoftwaretesting.com/'),
  isCi: EnvironmentVariables.getBoolean('CI', false),
  retries: EnvironmentVariables.getNumber('TEST_RETRIES', 2),
  workers: EnvironmentVariables.getNumber('TEST_WORKERS', 2),
  headless: EnvironmentVariables.getBoolean('HEADLESS', true),
  /** Timeout of a single test, in milliseconds. */
  testTimeout: EnvironmentVariables.getNumber('TEST_TIMEOUT', 60_000),
  /** Timeout of a single web first assertion, in milliseconds. */
  expectTimeout: EnvironmentVariables.getNumber('EXPECT_TIMEOUT', 10_000),
} as const;
