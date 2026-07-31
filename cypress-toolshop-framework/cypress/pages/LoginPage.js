class LoginPage {
  open() {
    cy.visit('/auth/login');
  }

  email() {
    return cy.get('[data-test="email"]');
  }

  password() {
    return cy.get('[data-test="password"]');
  }

  submit() {
    return cy.get('[data-test="login-submit"]');
  }

  getError(name) {
    return cy.get(`[data-test="${name}-error"]`);
  }
}

export const loginPage = new LoginPage();
