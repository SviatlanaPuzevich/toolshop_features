/** Ways of describing an URL a test is interested in. */
export type UrlMatcher = string | RegExp | ((url: string) => boolean);

export const matchesUrl = (url: string, matcher: UrlMatcher): boolean => {
  if (typeof matcher === 'string') {
    return url.includes(matcher);
  }

  if (matcher instanceof RegExp) {
    return matcher.test(url);
  }

  return matcher(url);
};
