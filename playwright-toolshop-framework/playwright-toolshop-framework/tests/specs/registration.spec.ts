import { RegistrationField, UserFactory } from '../../business/index.js';
import {
  AUTO_COMPLETED_ADDRESS_FIELDS,
  BIRTH_DATE_OF_ALLOWED_CUSTOMER,
  INVALID_FORMAT_CASES,
  REQUIRED_FIELDS,
  STRONG_PASSWORD,
  UNDERAGE_CASES,
  WEAK_PASSWORD_CASES,
} from '../data/registrationTestData.js';
import { expect, test } from '../fixtures/index.js';

test.describe('User registration', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
  });

  test('should register a customer with valid data', async ({ registerPage, loginPage }) => {
    await registerPage.register(UserFactory.createRegistrationData());

    await expect.poll(() => loginPage.isOpened()).toBe(true);
  });

  test('should complete the address from the postcode lookup', async ({ registerPage }) => {
    await registerPage.register(
      UserFactory.createRegistrationData({ street: '', city: '', state: '' }),
    );

    for (const field of AUTO_COMPLETED_ADDRESS_FIELDS) {
      await expect(registerPage.field(field)).not.toHaveValue('');
    }
  });

  test.describe('Required fields', () => {
    for (const field of REQUIRED_FIELDS) {
      test(`should report a missing ${field}`, async ({ registerPage }) => {
        await registerPage.fillForm(UserFactory.createRegistrationData());
        await registerPage.clearField(field);
        await registerPage.submit();

        await expect(registerPage.validationError(field)).toBeVisible();
      });
    }
  });

  test.describe('Field formats', () => {
    for (const { title, field, value } of INVALID_FORMAT_CASES) {
      test(`should report an invalid ${title}`, async ({ registerPage }) => {
        await registerPage.fillForm(UserFactory.createRegistrationData());
        await registerPage.fillField(field, value);
        await registerPage.submit();

        await expect(registerPage.validationError(field)).toBeVisible();
      });
    }
  });

  test.describe('Password strength', () => {
    test('should accept a strong password', async ({ registerPage, loginPage }) => {
      await registerPage.register(
        UserFactory.createRegistrationData({ password: STRONG_PASSWORD }),
      );

      await expect.poll(() => loginPage.isOpened()).toBe(true);
    });

    for (const { title, password } of WEAK_PASSWORD_CASES) {
      test(`should reject a password with ${title}`, async ({ registerPage }) => {
        await registerPage.register(UserFactory.createRegistrationData({ password }));

        await expect(registerPage.validationError(RegistrationField.password)).toBeVisible();
      });
    }
  });

  test.describe('Minimum age', () => {
    test('should register a customer who is old enough', async ({ registerPage, loginPage }) => {
      await registerPage.register(
        UserFactory.createRegistrationData({ dateOfBirth: BIRTH_DATE_OF_ALLOWED_CUSTOMER }),
      );

      await expect.poll(() => loginPage.isOpened()).toBe(true);
    });

    for (const { title, birthDate } of UNDERAGE_CASES) {
      test(`should reject a customer who ${title}`, async ({ registerPage }) => {
        await registerPage.register(UserFactory.createRegistrationData({ dateOfBirth: birthDate }));

        await expect(registerPage.formError).toBeVisible();
      });
    }
  });
});
