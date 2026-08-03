import { TestAttribute } from './TestAttribute.js';

/**
 * Locates the validation message the application renders for a form field.
 *
 * The markup is not consistent: some messages are addressable only by id
 * (`#house_number-error` has no matching `data-test`), and the `data-test` values of
 * the name fields use hyphens where the ids use underscores (`first-name-error` vs
 * `first_name-error`). A selector covering every variant keeps that quirk in one place.
 */
export class ValidationMessage {
  public static selectorFor(field: string): string {
    const hyphenatedField = field.replace(/_/g, '-');

    return [
      `#${field}-error`,
      TestAttribute.selector(`${field}-error`),
      TestAttribute.selector(`${hyphenatedField}-error`),
    ].join(', ');
  }
}
