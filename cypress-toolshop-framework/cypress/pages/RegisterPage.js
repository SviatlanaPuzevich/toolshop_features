export default class RegisterPage {
    open() {
        cy.visit('/auth/register');
    }

    firstName() {
        return cy.get('#first_name');
    }

    lastName() {
        return cy.get('#last_name');
    }

    dob() {
        return cy.get('#dob');
    }

    street() {
        return cy.get('#street');
    }

    houseNumber() {
        return cy.get('#house_number');
    }

    postcode() {
        return cy.get('#postal_code');
    }

    city() {
        return cy.get('#city');
    }

    state() {
        return cy.get('#state');
    }

    country() {
        return cy.get('#country');
    }

    phone() {
        return cy.get('#phone');
    }

    email() {
        return cy.get('#email');
    }

    password() {
        return cy.get('#password');
    }

    registerButton() {
        return cy.get('button[type="submit"]');
    }

    getField(name) {
        const fields = {
            first_name: this.firstName,
            last_name: this.lastName,
            dob: this.dob,
            street: this.street,
            house_number: this.houseNumber,
            postal_code: this.postcode,
            city: this.city,
            state: this.state,
            country: this.country,
            phone: this.phone,
            email: this.email,
            password: this.password,
        };

        return fields[name].call(this);
    }

    clearField(name) {
        this.getField(name)
            .clear()
            .blur();
    }

    getError(name) {
        return cy.get(`#${name}-error`);
    }

    getErrorElementById(id) {
        return cy.get(`#${id}-error`);
    }

    getErrorElementByDataTest(name) {
        return cy.get(`[data-test="${name}-error"]`);
    }


    submit() {
        this.registerButton().click();
    }
}