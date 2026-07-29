import RegisterPage from '../pages/RegisterPage.js';
import LoginPage from '../pages/LoginPage.js';

Cypress.Commands.add('fillRegistrationForm', (user = {}) => {
  const page = new RegisterPage();

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

  page.firstName().type(data.firstName);
  page.lastName().type(data.lastName);
  page.dob().type(data.dob);
  page.street().type(data.street);
  page.houseNumber().type(data.houseNumber);
  page.postcode().type(data.postcode);
  page.city().type(data.city);
  page.state().type(data.state);
  page.country().select(data.country);
  page.phone().type(data.phone);
  page.email().type(data.email);
  page.password().type(data.password);

  return cy.wrap(data);
});

Cypress.Commands.add('registerUser', (user = {}) => {
  cy.visit('/auth/register');

  return cy.fillRegistrationForm(user).then((data) => {
    const page = new RegisterPage();
    page.submit();
    cy.url().should('include', '/auth/login');
    return cy.wrap(data);
  });
});

Cypress.Commands.add('login', (user) => {
  const page = new LoginPage();
  page.email().clear();
  if (user.email) {
    page.email().type(user.email);
  }
  page.password().clear();
  if (user.password) {
    page.password().type(user.password);
  }
  page.submit().click();
});
