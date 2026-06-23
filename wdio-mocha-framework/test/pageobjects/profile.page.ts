import { $ } from '@wdio/globals';
import Page from './page.js';

class ProfilePage extends Page {
  public get inputEmail() {
    return $('#email');
  }

  public get inputPassword() {
    return $('#password');
  }

  public get btnSubmit() {
    return $('[data-test="login-submit"]');
  }

  public async login(email: string, password: string) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public open() {
    return super.open('account/profile');
  }
}

export default new ProfilePage();
