import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../core/index.js';
import { User } from '../models/User.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** Sign in form, rendered both on the login page and on the checkout sign in step. */
export class LoginForm extends BaseComponent {
  private static readonly ROOT_SELECTOR = `form:has(${TestAttribute.selector('login-submit')})`;

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  private constructor(root: Locator) {
    super(root);
    this.emailInput = root.locator(TestAttribute.selector('email'));
    this.passwordInput = root.locator(TestAttribute.selector('password'));
    this.submitButton = root.locator(TestAttribute.selector('login-submit'));
  }

  public static on(page: Page): LoginForm {
    return new LoginForm(page.locator(LoginForm.ROOT_SELECTOR));
  }

  public async login(user: User): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
}
