import { Page, Request } from '@playwright/test';
import { matchesUrl, UrlMatcher } from './UrlMatcher.js';

/**
 * Records the requests a page sends, so that a test can assert that a call was
 * (or, more often, was not) made.
 */
export class RequestSpy {
  private readonly recordedUrls: string[] = [];
  private readonly listener = (request: Request): void => {
    if (matchesUrl(request.url(), this.urlMatcher)) {
      this.recordedUrls.push(request.url());
    }
  };

  private constructor(
    private readonly page: Page,
    private readonly urlMatcher: UrlMatcher,
  ) {}

  public static watch(page: Page, urlMatcher: UrlMatcher): RequestSpy {
    const spy = new RequestSpy(page, urlMatcher);
    page.on('request', spy.listener);

    return spy;
  }

  public get requestCount(): number {
    return this.recordedUrls.length;
  }

  public stop(): void {
    this.page.off('request', this.listener);
  }
}
