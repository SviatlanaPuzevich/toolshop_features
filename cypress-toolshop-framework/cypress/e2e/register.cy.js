import RegisterPage from '../pages/RegisterPage';
import { getBirthDateWithOffset } from '../utils/dateHelper';

describe('User Registration', () => {

    let registerPage;

    beforeEach(() => {
        registerPage = new RegisterPage();
        registerPage.open();
    });

    describe('Successful registration', () => {

        it('should register user successfully', () => {

            cy.registerUser();

            registerPage.submit();

            cy.url().should('include', '/auth/login');
        });

    });

    describe('Required fields validation (Name fields)', () => {

        const requiredFields = [
            'first_name',
            'last_name'
        ];

        requiredFields.forEach(field => {

            it(`should validate required field ${field}`, () => {

                cy.registerUser();

                registerPage.clearField(field);

                registerPage.submit();

                registerPage
                    .getErrorElementById(field)
                    .should('be.visible');

            });

        });

    });

    describe('Required fields validation (Other fields)', () => {

        const requiredFields = [
            'dob',
            'street',
            'postal_code',
            'city',
            'state',
            'phone',
            'email',
            'password',
        ];

        requiredFields.forEach(field => {

            it(`should validate required field ${field}`, () => {

                cy.registerUser();

                registerPage.clearField(field);

                registerPage.submit();

                registerPage
                    .getError(field)
                    .should('be.visible');

            });

        });

    });

    describe('Invalid field format validation', () => {

        const testCases = [
            {
                field: 'Birth day',
                name: 'dob',
                value: '123'
            },
            {
                field: 'Phone',
                name: 'phone',
                value: '+370222'
            },
            {
                field: 'Email',
                name: 'email',
                value: 'email.com'
            }
        ];

        testCases.forEach(({ field, name, value }) => {

            it(`should show validation error for ${field}`, () => {

                cy.registerUser();

                registerPage
                    .getField(name)
                    .clear()
                    .type(value);

                registerPage.submit();

                registerPage
                    .getError(name)
                    .should('be.visible');

            });

        });

    });

    describe('Weak password validation', () => {

        const passwordCases = [
            {
                password: 'tP9$mX2!vK8#qZ5[',
                valid: true,
                reason: 'strong valid'
            },
            {
                password: 'password1!',
                valid: false,
                reason: 'no uppercase'
            },
            {
                password: 'PASSWORD1!',
                valid: false,
                reason: 'no lowercase'
            },
            {
                password: 'Password!',
                valid: false,
                reason: 'no digit'
            },
            {
                password: 'Password1',
                valid: false,
                reason: 'no special char'
            },
            {
                password: '123456!',
                valid: false,
                reason: 'no letters'
            },
            {
                password: 'Pass!',
                valid: false,
                reason: 'too short'
            }
        ];

        passwordCases.forEach(({ password, valid, reason }) => {

            it(`should validate password: ${reason}`, () => {

                cy.registerUser({password});

                registerPage.submit();

                if (valid) {

                    cy.url().should('include', '/auth/login');

                } else {

                    registerPage
                        .getError('password')
                        .should('be.visible');

                }

            });

        });

    });

    describe('Underage users validation', () => {

        const ageCases = [
            {
                birthDate: getBirthDateWithOffset(-1),
                valid: true,
                title: 'exactly 18+'
            },
            {
                birthDate: getBirthDateWithOffset(0),
                valid: false,
                title: 'exact boundary'
            },
            {
                birthDate: getBirthDateWithOffset(1),
                valid: false,
                title: '1 day younger'
            }
        ];

        ageCases.forEach(({ birthDate, valid, title }) => {

            it(`should validate age: ${title}`, () => {

                cy.registerUser();

                registerPage
                    .dob()
                    .clear()
                    .type(birthDate);

                registerPage.submit();

                if (valid) {

                    cy.url().should('include', '/auth/login');

                } else {

                    registerPage
                        .getErrorElementByDataTest('register')
                        .should('be.visible');

                }

            });

        });

    });

});