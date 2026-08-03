/** Generates random values for test data. Knows nothing about the tested application. */
export class RandomDataGenerator {
  private static readonly UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly DIGITS = '0123456789';
  private static readonly SPECIAL_CHARACTERS = '!@#$%^&*()_+-=';
  private static readonly DEFAULT_PASSWORD_LENGTH = 12;

  public static integer(maxExclusive: number): number {
    return Math.floor(Math.random() * maxExclusive);
  }

  public static pickOne<T>(items: readonly T[]): T {
    return items[RandomDataGenerator.integer(items.length)];
  }

  /** Returns a new array with the same items in random order. The argument is not modified. */
  public static shuffle<T>(items: readonly T[]): T[] {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index--) {
      const swapIndex = RandomDataGenerator.integer(index + 1);
      [shuffledItems[index], shuffledItems[swapIndex]] = [
        shuffledItems[swapIndex],
        shuffledItems[index],
      ];
    }

    return shuffledItems;
  }

  /** Value that is unique per process and per call, safe to use in parallel workers. */
  public static uniqueSuffix(): string {
    return `${Date.now()}${RandomDataGenerator.integer(1000)}`;
  }

  public static email(prefix = 'user', domain = 'mail.com'): string {
    return `${prefix}${RandomDataGenerator.uniqueSuffix()}@${domain}`;
  }

  /** Password containing at least one upper case, lower case, digit and special character. */
  public static password(length: number = RandomDataGenerator.DEFAULT_PASSWORD_LENGTH): string {
    const alphabets = [
      RandomDataGenerator.UPPERCASE_LETTERS,
      RandomDataGenerator.LOWERCASE_LETTERS,
      RandomDataGenerator.DIGITS,
      RandomDataGenerator.SPECIAL_CHARACTERS,
    ];
    const allCharacters = [...alphabets.join('')];
    const characters = alphabets.map((alphabet) => RandomDataGenerator.pickOne([...alphabet]));

    while (characters.length < Math.max(length, alphabets.length)) {
      characters.push(RandomDataGenerator.pickOne(allCharacters));
    }

    return RandomDataGenerator.shuffle(characters).join('');
  }
}
