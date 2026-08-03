import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/index.js';
import { GuestCheckoutForm } from '../components/GuestCheckoutForm.js';
import { LoginForm } from '../components/LoginForm.js';
import { GuestContact, User } from '../models/User.js';
import { ValidationMessage } from '../support/ValidationMessage.js';

/**
 * Sign in step of the checkout. It shares its URL with the cart and is only reachable
 * from there, therefore it cannot be opened directly.
 */
export class CheckoutPage extends BasePage {
  private static readonly LOGIN_ERROR_NAME = 'login';

  private readonly loginForm: LoginForm;
  private readonly guestForm: GuestCheckoutForm;
  private readonly guestTabLink: Locator;
  private readonly signedInBanner: Locator;
  private readonly guestBanner: Locator;
  private readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = LoginForm.on(page);
    this.guestForm = GuestCheckoutForm.on(page);
    this.guestTabLink = page.locator('a[href="#guest-tab"]');
    this.signedInBanner = page.getByText('already logged in');
    this.guestBanner = page.locator('p:has-text("Continuing as guest:")');
    this.loginErrorMessage = page.locator(
      ValidationMessage.selectorFor(CheckoutPage.LOGIN_ERROR_NAME),
    );
  }

  public get signedInMessage(): Locator {
    return this.signedInBanner;
  }

  public get guestMessage(): Locator {
    return this.guestBanner;
  }

  public get loginError(): Locator {
    return this.loginErrorMessage;
  }

  public async signIn(user: User): Promise<void> {
    await this.loginForm.login(user);
  }

  public async continueAsGuest(guest: GuestContact): Promise<void> {
    await this.guestTabLink.click();
    await this.guestForm.continueAs(guest);
  }
}
