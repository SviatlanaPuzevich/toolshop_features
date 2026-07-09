import {Page} from '@playwright/test';

export class SearchFilter {

    constructor(private readonly page: Page) {
    }

    readonly searchInput = this.page.locator('[data-test="search-query"]');
    readonly searchSubmit = this.page.locator('[data-test="search-submit"]');
    readonly clearButton = this.page.locator('[data-test="search-reset"]');
    readonly emptyMessage = this.page.locator('text=There are no products found.');


    async search(text: string) {
        await this.searchInput.fill(text);
        await this.searchSubmit.click();
    }

    async clearSearch() {
        await this.clearButton.click();
    }


    async waitForSearch() {
        await this.page.waitForLoadState('networkidle');
    }
}