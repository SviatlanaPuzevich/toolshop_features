import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../../core/index.js';
import { GuestContact } from '../models/User.js';
import { TestAttribute } from '../support/TestAttribute.js';

/** Form that lets a shopper continue the checkout without an account. */
export class GuestCheckoutForm extends BaseComponent {
  private static readonly ROOT_SELECTOR = '#guest-tab';

  private readonly emailInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly continueButton: Locator;

  private constructor(root: Locator) {
    super(root);
    this.emailInput = root.locator(TestAttribute.selector('guest-email'));
    this.firstNameInput = root.locator(TestAttribute.selector('guest-first-name'));
    this.lastNameInput = root.locator(TestAttribute.selector('guest-last-name'));
    this.continueButton = root.locator(TestAttribute.selector('guest-submit'));
  }

  public static on(page: Page): GuestCheckoutForm {
    return new GuestCheckoutForm(page.locator(GuestCheckoutForm.ROOT_SELECTOR));
  }

  public async continueAs(guest: GuestContact): Promise<void> {
    await this.emailInput.fill(guest.email);
    await this.firstNameInput.fill(guest.firstName);
    await this.lastNameInput.fill(guest.lastName);
    await this.continueButton.click();
  }
}
