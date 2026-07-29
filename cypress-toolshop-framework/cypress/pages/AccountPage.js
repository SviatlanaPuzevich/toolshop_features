export default class AccountPage {
  navMenu() {
    return cy.get('[data-test="nav-menu"]');
  }

  signOutItem() {
    return cy.get('[data-test="nav-sign-out"]');
  }

  signOut() {
    this.navMenu().click();
    this.signOutItem().click();
  }

  open() {
    cy.visit('/account');
  }
}
