import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { getBirthDateWithOffset } from '../utils/dateHelper';

test.describe('User Registration', () => {
    let registrationPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegisterPage(page);
        await registrationPage.open();
    });

    test.describe('Successful registration', () => {
        test('should register user successfully', async ({ page }) => {
            await registrationPage.fillValidForm();
            await registrationPage.submit();

            await expect(page).toHaveURL(/.*\/auth\/login/);
        });
    });

    test.describe('Required fields validation (Name fields)', () => {
        const requiredFields = ['first_name', 'last_name'];

        for (const field of requiredFields) {
            test(`should validate required field ${field}`, async () => {
                await registrationPage.fillValidForm();
                await registrationPage.clearField(field);
                await registrationPage.submit();

                const errorElement = registrationPage.getErrorElementById(field);
                await expect(errorElement).toBeVisible();
            });
        }
    });

    test.describe('Required fields validation (Other fields)', () => {
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

        for (const field of requiredFields) {
            test(`should validate required field ${field}`, async () => {
                await registrationPage.fillValidForm();
                await registrationPage.clearField(field);
                await registrationPage.submit();

                const errorElement = registrationPage.getError(field);
                await expect(errorElement).toBeVisible();
            });
        }
    });

    test.describe('Invalid field format validation', () => {
        const testCases = [
            { field: 'Birth day', name: 'dob', value: '123' },
            { field: 'Phone', name: 'phone', value: '+370222' },
            { field: 'Email', name: 'email', value: 'email.com' },
        ];

        for (const { field, name, value } of testCases) {
            test(`should show validation error for ${field}`, async () => {
                await registrationPage.fillValidForm();

                const inputField = registrationPage.getField(name);
                await inputField.fill(value);
                await registrationPage.submit();

                const errorElement = registrationPage.getError(name);
                await expect(errorElement).toBeVisible();
            });
        }
    });

    test.describe('Weak password validation', () => {
        const passwordCases = [
            { password: 'tP9$mX2!vK8#qZ5[', valid: true, reason: 'strong valid' },
            { password: 'password1!', valid: false, reason: 'no uppercase' },
            { password: 'PASSWORD1!', valid: false, reason: 'no lowercase' },
            { password: 'Password!', valid: false, reason: 'no digit' },
            { password: 'Password1', valid: false, reason: 'no special char' },
            { password: '123456!', valid: false, reason: 'no letters' },
            { password: 'Pass!', valid: false, reason: 'too short' },
        ];

        for (const { password, valid, reason } of passwordCases) {
            test(`should validate password: ${reason}`, async ({ page }) => {
                await registrationPage.fillValidForm(password);
                await registrationPage.submit();

                if (valid) {
                    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 5000 });
                } else {
                    const errorElement = registrationPage.getError('password');
                    await expect(errorElement).toBeVisible();
                }
            });
        }
    });

    test.describe('Underage users validation', () => {
        const ageCases = [
            { birthDate: getBirthDateWithOffset(-1), valid: true, title: 'exactly 18+' },
            { birthDate: getBirthDateWithOffset(0), valid: false, title: 'exact boundary' },
            { birthDate: getBirthDateWithOffset(1), valid: false, title: '1 day younger' },
        ];

        for (const { birthDate, valid, title } of ageCases) {
            test(`should validate age: ${title}`, async ({ page }) => {
                await registrationPage.fillValidForm();

                await registrationPage.dob.fill(birthDate);
                await registrationPage.submit();

                if (valid) {
                    await expect(page).toHaveURL(/.*\/auth\/login/);
                } else {
                    const errorElement = registrationPage.getError('register');
                    await expect(errorElement).toBeVisible({
                        timeout: 3000,
                    });
                }
            });
        }
    });
});