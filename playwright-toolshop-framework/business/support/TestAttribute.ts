/** Builds selectors for the `data-test` attribute the application marks its elements with. */
export class TestAttribute {
  private static readonly NAME = 'data-test';

  public static selector(value: string): string {
    return `[${TestAttribute.NAME}="${value}"]`;
  }
}
