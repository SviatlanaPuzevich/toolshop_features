import {test, expect} from '../fixtures/registerFixture';
import {CatalogPage} from '../pages/CatalogPage';

test.describe('Product Categories', () => {

    let categoryPage: CatalogPage;

    test.beforeEach(async ({page}) => {
        categoryPage = new CatalogPage(page);
        await categoryPage.open();
    });

    test('should display available categories', async () => {

        const categories = await categoryPage.getAvailableCategories();

        expect(categories.length).toBeGreaterThan(0);
        expect(categories).toContain('Power Tools');
    });

    test.describe('Category selection', () => {

        [
            'Power Tools',
            'Hand Tools',
            'Other'
        ].forEach(category => {

            test(`should display products for ${category}`, async () => {
                await categoryPage.selectCategory(category);
                await categoryPage.waitProductsLoaded();
                expect(await categoryPage.productCount()).toBeGreaterThan(0);
            });

        });

    });

    test('should refresh products after category change', async ({page}) => {
        await categoryPage.selectCategory('Hand Tools');
        const secondCategoryProducts = await categoryPage.getProductNames();

        await categoryPage.selectCategory('Power Tools');
        await page.waitForLoadState('networkidle');
        const firstCategoryProducts = await categoryPage.getProductNames();

        expect(firstCategoryProducts).not.toEqual(secondCategoryProducts);
    });

    test('should display category filters', async ({page}) => {

        await categoryPage.selectCategory('Power Tools');

        await expect(categoryPage.filtersPanel).toBeVisible();
        const subFilters = page.locator('h4:has-text("By category:") + div >> ul div label');
        expect(await subFilters.count()).toBeGreaterThan(0);
    });

    test('should update filters after category change', async ({page}) => {

        await categoryPage.selectCategory('Power Tools');
        const firstFilters = await categoryPage.subfiltersCount();
        await categoryPage.selectCategory('Hand Tools');
        await page.waitForLoadState('networkidle');
        const secondFilters = await categoryPage.subfiltersCount();


        expect(secondFilters).toBeGreaterThan(0);
        expect(firstFilters || secondFilters).toBeTruthy();
    });

    test('should display rentals products', async () => {

        await categoryPage.selectCategory('Rentals');
        await categoryPage.waitProductsLoaded();

        expect(  await categoryPage.productCount()).toEqual(3);
    });

});