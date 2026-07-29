import AccountPage from '../pages/AccountPage.js';
import LoginPage from '../pages/LoginPage.js';

describe('User Sign In', () => {
  let loginPage;
  let user;

  before(() => {
    loginPage = new LoginPage();

    cy.registerUser().then((createdUser) => {
      user = createdUser;
    });
  });

  beforeEach(() => {
    loginPage.open();
  });

  it('Successful login with valid credentials', () => {
    cy.login(user);
    cy.url().should('include', '/account');
    const accountPage = new AccountPage();
    accountPage.signOut();
  });

  const requiredFields = [
    { email: '', password: 'password1', id: 'email' },
    { email: 'user@test.com', password: '', id: 'password' },
  ];

  requiredFields.forEach(({ email, password, id }) => {
    it(`Required fields validation (email="${email}", password="${password}")`, () => {
      cy.login({ email, password });
      loginPage.getError(id).should('be.visible');
    });
  });

  it('Login fails with invalid password', () => {
    cy.login({
      email: user.email,
      password: 'wrongPassword123!',
    });
    loginPage.getError('login').should('be.visible');
  });

  it('Login fails with invalid email', () => {
    cy.login({
      email: 'unknownEmail@example.com',
      password: 'wrongPassword123!',
    });
    loginPage.getError('login').should('be.visible');
  });
});
