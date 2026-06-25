import ProfilePage from '../pageobjects/profile.page';
import LoginPage from '../pageobjects/login.page';
import { createUser, generateStrongPassword } from '../../utils/registrationHelper';
import { User } from '../../types/types.ts';
import { expect, assert } from 'chai';
import AccountPage from '../pageobjects/account.page.ts';

describe('User Profile Management', () => {
  let user: User;

  before(async () => {
    user = await createUser();
    await LoginPage.open();
    await LoginPage.login(user.email, user.password);
    await AccountPage.navMenu.waitForDisplayed({ timeout: 3000 });
  });

  beforeEach(async () => {
    await ProfilePage.open();
  });


  describe('Personal Information', () => {
    it('should display prefilled profile data', async () => {
      expect(await ProfilePage.firstName.getValue()).to.equal('John');

      expect(await ProfilePage.lastName.getValue()).to.equal('Doe');

      expect(await ProfilePage.email.getValue()).to.equal(user.email);
    });

    it('should update profile successfully', async () => {
      await ProfilePage.updateProfile({
        firstName: 'Updated',
        lastName: 'User',
        phone: '37061234567',
        postcode: '54321',
        city: 'Minsk',
        state: 'Minsk',
        country: 'Belarus',
      });

      await ProfilePage.submitProfile();
      await ProfilePage.alert.waitForDisplayed({
        timeout: 3000,
        reverse: false,
        timeoutMsg: 'Do not show alert during 3 seconds.',
      });
      assert.isTrue(await ProfilePage.successAlert.isDisplayed());

      assert.isTrue(await ProfilePage.successAlert.isDisplayed());
    });

    it('should not allow email modification', async () => {
      const readonly = await ProfilePage.email.getAttribute('readonly');

      expect(readonly).to.not.be.null;
    });

    const requiredFields = [
      { id: 'first_name', field: 'First name' },
      { id: 'last_name', field: 'Last name' },
      { id: 'country', field: 'Country' },
      { id: 'city', field: 'City' },
    ];

    requiredFields.forEach(({field}) => {
      it(`should validate required field ${field}`, async () => {

        await ProfilePage.clearFiled(field);

        await ProfilePage.submitProfile();
        await ProfilePage.alert.waitForDisplayed({
          timeout: 3000,
          reverse: false,
          timeoutMsg: 'Do not show alert during 3 seconds.',
        });

        expect(await ProfilePage.errorAlert.isDisplayed()).to.be.true;
      });
    });

  });

  describe('Password Change', () => {
    it('should change password successfully', async () => {
      const newPassword = generateStrongPassword();

      await ProfilePage.currentPassword.setValue(user.password);
      await ProfilePage.newPassword.setValue(newPassword);
      await ProfilePage.confirmPassword.setValue(newPassword);
      await ProfilePage.submitPasswordChange();

      await ProfilePage.alert.waitForDisplayed({
        timeout: 3000,
        reverse: false,
        timeoutMsg: 'Do not show alert during 3 seconds.',
      });

      expect(await ProfilePage.successAlert.isDisplayed()).to.be.true;

      await LoginPage.open();
      await LoginPage.login(user.email, newPassword);
      await browser.waitUntil(async () => (await browser.getUrl()).includes('/account'), {
        timeout: 3000,
        timeoutMsg: 'URL have been not changed to /account during 3 seconds. ',
      });

      expect(await browser.getUrl()).to.include('/account');
    });

    const passwordCases = [
      {
        currentPassword: 'wrong',
        newPassword: 'bN4$tG9!zF2#wQ6*',
        confirmPassword: 'bN4$tG9!zF2#wQ6*',
        message: 'Your current password does not matches with the password.',
      },
      {
        currentPassword: 'valid',
        newPassword: 'short',
        confirmPassword: 'short',
        message: 'The new password field must be at least 8 characters.',
      },
      {
        currentPassword: 'valid',
        newPassword: 'newpass1!',
        confirmPassword: 'newpass1!',
        message:
          'The new password field must contain at least one uppercase and one lowercase letter.',
      },
      {
        currentPassword: 'valid',
        newPassword: 'Newpass1!',
        confirmPassword: 'mismatch',
        message: 'The new password field confirmation does not match.',
      },
    ];

    passwordCases.forEach(({ currentPassword, newPassword, confirmPassword, message }) => {
      it(`should show password validation: ${message}`, async () => {
        await ProfilePage.currentPassword.setValue(
          currentPassword === 'valid' ? user.password : currentPassword
        );

        await ProfilePage.newPassword.setValue(newPassword);
        await ProfilePage.confirmPassword.setValue(confirmPassword);
        await ProfilePage.submitPasswordChange();
        await ProfilePage.alert.waitForDisplayed({
          timeout: 3000,
          reverse: false,
          timeoutMsg: 'Do not show alert during 3 seconds.',
        });

        expect(await ProfilePage.errorAlert.isDisplayed()).to.be.true;
      });
    });
  });
});
