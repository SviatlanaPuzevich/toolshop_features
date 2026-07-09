import {Page} from '@playwright/test';

export class CategoryFilters {

    constructor(private readonly page: Page) {
    }

    readonly filtersPanel = this.page.locator('h4:has-text("By category:") + div.checkbox');
    readonly subFilters = this.page.locator('//h4[contains(text(), \'By category:\')]/following-sibling::div[1]//ul//div');


    async subfiltersCount() {
        return this.subFilters.count();
    }
}