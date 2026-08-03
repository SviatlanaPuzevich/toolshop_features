/**
 * Typed, fail-fast access to environment variables.
 *
 * The core layer only knows *how* to read a variable - which variables exist and
 * what their defaults are is decided by the tests layer configuration.
 */
export class EnvironmentVariables {
  private static readonly TRUTHY_VALUES = ['1', 'true', 'yes', 'on'];

  public static getString(name: string, defaultValue: string): string {
    return EnvironmentVariables.read(name) ?? defaultValue;
  }

  public static getNumber(name: string, defaultValue: number): number {
    const value = EnvironmentVariables.read(name);

    if (value === undefined) {
      return defaultValue;
    }

    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`Environment variable "${name}" must be a number, but was "${value}".`);
    }

    return parsedValue;
  }

  public static getBoolean(name: string, defaultValue: boolean): boolean {
    const value = EnvironmentVariables.read(name);

    if (value === undefined) {
      return defaultValue;
    }

    return EnvironmentVariables.TRUTHY_VALUES.includes(value.toLowerCase());
  }

  private static read(name: string): string | undefined {
    const value = process.env[name];

    return value === undefined || value.trim() === '' ? undefined : value.trim();
  }
}
