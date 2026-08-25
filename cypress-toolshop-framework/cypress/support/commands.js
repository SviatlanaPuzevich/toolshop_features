import {registerPage} from '../pages/RegisterPage.js';
import {loginPage} from '../pages/LoginPage.js';

Cypress.Commands.add('fillRegistrationForm', (user = {}) => {

  const defaults = {
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    street: 'Main street',
    houseNumber: '10',
    postcode: '12345',
    city: 'Vilnius',
    state: 'Vilnius',
    country: 'Lithuania',
    phone: '37061234567',
    email: `john${Date.now()}@mail.com`,
    password: 'tP9$mX2!vK8#qZ5[',
  };

  const data = { ...defaults, ...user };

  registerPage.firstName().type(data.firstName);
  registerPage.lastName().type(data.lastName);
  registerPage.dob().type(data.dob);
  registerPage.street().type(data.street);
  registerPage.houseNumber().type(data.houseNumber);
  registerPage.postcode().type(data.postcode);
  registerPage.city().type(data.city);
  registerPage.state().type(data.state);
  registerPage.country().select(data.country);
  registerPage.phone().type(data.phone);
  registerPage.email().type(data.email);
  registerPage.password().type(data.password);

  return cy.wrap(data);
});

Cypress.Commands.add('registerUser', (user = {}) => {
  cy.visit('/auth/register');

  return cy.fillRegistrationForm(user).then((data) => {
    registerPage.submit();
    cy.url().should('include', '/auth/login');
    return cy.wrap(data);
  });
});

Cypress.Commands.add('login', (user) => {
  loginPage.email().clear();
  if (user.email) {
    loginPage.email().type(user.email);
  }
  loginPage.password().clear();
  if (user.password) {
    loginPage.password().type(user.password);
  }
  loginPage.submit().click();
});
