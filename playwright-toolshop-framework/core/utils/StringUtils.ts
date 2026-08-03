export class StringUtils {
  private static readonly REG_EXP_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\/]/g;

  /** Escapes a plain string so that it can be safely embedded into a regular expression. */
  public static escapeRegExp(value: string): string {
    return value.replace(StringUtils.REG_EXP_SPECIAL_CHARACTERS, '\\$&');
  }
}
