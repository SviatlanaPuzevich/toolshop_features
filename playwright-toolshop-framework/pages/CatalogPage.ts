import {Locator, Page, expect} from '@playwright/test';

export class CatalogPage {

    constructor(private readonly page: Page) {
    }

    readonly categorySelect = this.page.locator('[data-test="nav-categories"]');
    readonly categoryOptions = this.page.locator('[data-test="nav-categories"] + ul li');
    readonly productCards = this.page.locator('.card');
    readonly productNames = this.page.locator('[data-test="product-name"]');
    readonly filtersPanel = this.page.locator('h4:has-text("By category:") + div.checkbox');
    readonly subFilters = this.page.locator('//h4[contains(text(), \'By category:\')]/following-sibling::div[1]//ul//div');

    async open() {
        await this.page.goto('/');
    }

    async openCategories() {
        await this.categorySelect.click();
    }

    async selectCategory(category: string) {
        await this.openCategories();
        const categoriesList = this.page.locator('[data-test="nav-categories"] + ul a');
        await categoriesList.getByText(category, {exact: true}).click({ force: true });
    }

    async getAvailableCategories() {
        await this.openCategories();
        return this.categoryOptions.allTextContents();
    }

    async getProductNames() {
        return this.productNames.allTextContents();
    }

    async waitProductsLoaded() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async productCount() {
        return this.productCards.count();
    }

    async hasFilters() {
        return this.filtersPanel.isVisible();
    }

    async subfiltersCount() {
        return this.subFilters.count();
    }
}