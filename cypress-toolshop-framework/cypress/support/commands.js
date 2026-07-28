import RegisterPage from "../pages/RegisterPage.js";

Cypress.Commands.add('registerUser', (user = {}) => {
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
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })