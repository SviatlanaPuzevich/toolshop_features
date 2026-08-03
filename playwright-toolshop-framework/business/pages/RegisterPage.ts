import { Locator, Page } from '@playwright/test';
import { NavigablePage } from '../../core/index.js';
import { AppRoutes } from '../constants/AppRoutes.js';
import { RegistrationField, RegistrationTextField } from '../models/RegistrationField.js';
import { RegistrationData } from '../models/User.js';
import { TestAttribute } from '../support/TestAttribute.js';
import { ValidationMessage } from '../support/ValidationMessage.js';

export class RegisterPage extends NavigablePage {
  /** Name of the message shown when the shop itself rejects the registration. */
  private static readonly FORM_ERROR_NAME = 'register';

  protected readonly path = AppRoutes.register;

  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator(TestAttribute.selector('register-submit'));
  }

  /** Every field is addressable by an id equal to its name, so one lookup serves them all. */
  public field(field: RegistrationField): Locator {
    return this.page.locator(`#${field}`);
  }

  public validationError(field: RegistrationField): Locator {
    return this.page.locator(ValidationMessage.selectorFor(field));
  }

  public get formError(): Locator {
    return this.page.locator(ValidationMessage.selectorFor(RegisterPage.FORM_ERROR_NAME));
  }

  public async register(data: RegistrationData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }

  public async fillForm(data: RegistrationData): Promise<void> {
    for (const [field, value] of RegisterPage.textValuesOf(data)) {
      await this.fillField(field, value);
    }

    await this.selectCountry(data.country);
  }

  public async fillField(field: RegistrationTextField, value: string): Promise<void> {
    await this.field(field).fill(value);
  }

  /** Empties a field and blurs it, so the form marks it as touched and shows the message. */
  public async clearField(field: RegistrationTextField): Promise<void> {
    const input = this.field(field);

    await input.fill('');
    await input.blur();
  }

  public async selectCountry(country: string): Promise<void> {
    await this.field(RegistrationField.country).selectOption({ label: country });
  }

  public async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** The record type makes the compiler complain as soon as a text field is left out. */
  private static textValuesOf(data: RegistrationData): [RegistrationTextField, string][] {
    const values: Record<RegistrationTextField, string> = {
      [RegistrationField.firstName]: data.firstName,
      [RegistrationField.lastName]: data.lastName,
      [RegistrationField.dateOfBirth]: data.dateOfBirth,
      [RegistrationField.street]: data.street,
      [RegistrationField.houseNumber]: data.houseNumber,
      [RegistrationField.postalCode]: data.postalCode,
      [RegistrationField.city]: data.city,
      [RegistrationField.state]: data.state,
      [RegistrationField.phone]: data.phone,
      [RegistrationField.email]: data.email,
      [RegistrationField.password]: data.password,
    };

    return Object.entries(values) as [RegistrationTextField, string][];
  }
}
