import Page from './page.js';

class AccountPage extends Page {
  public get navMenu() {
    return this.getElementByDataTestAttribute('nav-menu');
  }

  public get signOutItem() {
    return this.getElementByDataTestAttribute('nav-sign-out');
  }

  public async signOut() {
    await this.navMenu.click();
    await this.signOutItem.click();
  }

  public open() {
    return super.open('account');
  }
}

export default new AccountPage();
