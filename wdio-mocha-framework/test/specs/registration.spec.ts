import { expect, assert } from 'chai';
import RegistrationPage from '../pageobjects/registration.page';
import { getBirthDateWithOffset } from '../../utils/dataHelper.ts';

describe('User Registration', () => {
  beforeEach(async () => {
    await RegistrationPage.open();
  });

  describe('Successful registration (Chai Expect)', () => {
    it('should register user successfully', async () => {
      await RegistrationPage.fillValidForm();

      await RegistrationPage.submit();

      await browser.waitUntil(async () => (await browser.getUrl()).includes('/auth/login'), {
        timeout: 5000,
        timeoutMsg: 'URL have been not changed to /auth/login during 5 seconds. ',
      });
      const currentUrl = await browser.getUrl();
      expect(currentUrl).to.include('/auth/login');
    });
  });

  describe('Required fields validation (Chai Assert)', () => {
    const requiredFields = ['first_name', 'last_name'];

    requiredFields.forEach((field) => {
      it(`should validate required field ${field}`, async () => {
        await RegistrationPage.fillValidForm();

        await RegistrationPage.clearFiled(field);
        await RegistrationPage.submit();

        const isErrorDisplayed = await RegistrationPage.getErrorElementById(field).isDisplayed();
        assert.isTrue(isErrorDisplayed, `Error for field "${field}" is not displayed`);
      });
    });
  });

  describe('Required fields validation (Chai Assert)', () => {
    const requiredFields = [
      'dob',
      'street',
      'house_number',
      'postal_code',
      'city',
      'state',
      'phone',
      'email',
      'password',
    ];

    requiredFields.forEach((field) => {
      it(`should validate required field ${field}`, async () => {
        await RegistrationPage.fillValidForm();

        await RegistrationPage.clearFiled(field);
        await RegistrationPage.submit();

        const isErrorDisplayed = await RegistrationPage.getError(field).isDisplayed();
        assert.isTrue(isErrorDisplayed, `Error for field "${field}" is not displayed`);
      });
    });
  });

  describe('Invalid field format validation (Chai Expect)', () => {
    const testCases = [
      { field: 'Birth day', name: 'dob', value: '123' },
      { field: 'Phone', name: 'phone', value: '+370222' },
      { field: 'Email', name: 'email', value: 'email.com' },
    ];

    testCases.forEach(({ field, name, value }) => {
      it(`should show validation error for ${field}`, async () => {
        await RegistrationPage.fillValidForm();

        const element = RegistrationPage.getField(name);
        await element.clearValue();
        await element.setValue(value);
        await RegistrationPage.submit();

        const isErrorDisplayed = await RegistrationPage.getError(name).isDisplayed();
        expect(isErrorDisplayed).to.be.true;
      });
    });
  });

  describe('Weak password validation (Chai Expect)', () => {
    const passwordCases = [
      { password: 'tP9$mX2!vK8#qZ5[', valid: true, reason: 'strong valid' },
      { password: 'password1!', valid: false, reason: 'no uppercase' },
      { password: 'PASSWORD1!', valid: false, reason: 'no lowercase' },
      { password: 'Password!', valid: false, reason: 'no digit' },
      { password: 'Password1', valid: false, reason: 'no special char' },
      { password: '123456!', valid: false, reason: 'no letters' },
      { password: 'Pass!', valid: false, reason: 'too short' },
    ];

    passwordCases.forEach(({ password, valid, reason }) => {
      it(`should validate password: ${reason}`, async () => {
        await RegistrationPage.fillValidForm(password);
        await RegistrationPage.submit();

        if (valid) {
          await browser.waitUntil(async () => (await browser.getUrl()).includes('/auth/login'), {
            timeout: 5000,
            timeoutMsg: 'URL have been not changed to /auth/login during 5 seconds. ',
          });
          const currentUrl = await browser.getUrl();

          expect(currentUrl).to.include('/auth/login');
        } else {
          const isErrorDisplayed = await RegistrationPage.getError('password').isDisplayed();

          expect(isErrorDisplayed).to.be.true;
        }
      });
    });
  });

  describe('Underage users validation (Chai Assert)', () => {
    const ageCases = [
      {
        birthDate: getBirthDateWithOffset(-1),
        valid: true,
        title: 'exactly 18+',
      },
      {
        birthDate: getBirthDateWithOffset(0),
        valid: false,
        title: 'exact boundary',
      },
      {
        birthDate: getBirthDateWithOffset(1),
        valid: false,
        title: '1 day younger',
      },
    ];

    ageCases.forEach(({ birthDate, valid, title }) => {
      it(`should validate age: ${title}`, async () => {
        await RegistrationPage.fillValidForm();
        await RegistrationPage.dob.clearValue();
        await RegistrationPage.dob.setValue(birthDate);
        await RegistrationPage.submit();

        if (valid) {
          await browser.waitUntil(async () => (await browser.getUrl()).includes('/auth/login'), {
            timeout: 3000,
            timeoutMsg: 'URL have been not changed to /auth/login during 5 seconds. ',
          });
          const currentUrl = await browser.getUrl();

          assert.include(currentUrl, '/auth/login');
        } else {
          const errorElement = RegistrationPage.getError('register');
          await errorElement.waitForDisplayed({
            timeout: 3000,
            timeoutMsg: 'Validation error for password field was not displayed within 3 seconds.',
          });
          const isErrorDisplayed = await errorElement.isDisplayed();

          assert.isTrue(isErrorDisplayed, 'Underage error message is not displayed');
        }
      });
    });
  });
});
