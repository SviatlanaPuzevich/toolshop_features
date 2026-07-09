import {expect, test} from '@playwright/test';
import {SearchFilter} from '../components/SearchFilter';
import {CatalogPage} from '../pages/CatalogPage';

test.describe('Product Search', () => {

    let catalogPage: CatalogPage;
    let searchFilter: SearchFilter;

    test.beforeEach(async ({page}) => {
        catalogPage = new CatalogPage(page);
        searchFilter = new SearchFilter(page);

        await catalogPage.open();
    });

    test('should search product by exact name', async () => {
        await searchFilter.search('Hammer');
        await searchFilter.waitForSearch();
        const products = await catalogPage.getProductNames();

        expect(products).toContainEqual(expect.stringMatching(/hammer/i));
    });

    test('should search product by partial name', async () => {

        await searchFilter.search('Ham');
        await searchFilter.waitForSearch();

        const products = await catalogPage.getProductNames();

        expect(products.length).toBeGreaterThan(0);

        products.forEach(product =>
            expect(product.toLowerCase()).toContain('ham')
        );
    });

    test.describe('Minimum search length', () => {

        ['H', 'Ha'].forEach(query => {

            test(`should not trigger search for "${query}"`, async () => {
                await catalogPage.waitProductsLoaded();
                const initialCount = await catalogPage.productCount();
                await searchFilter.search(query);

                expect(await catalogPage.productCount()).toBe(initialCount);
            });

        });

    });

    // test('should clear search results', async ({page}) => {
    //     await catalogPage.waitProductsLoaded();
    //     const fullCatalogCount = await catalogPage.productCount();
    //     await searchFilter.search('Hammer');
    //     await searchFilter.waitForSearch();
    //
    //     expect(await catalogPage.productCount()).toBeLessThan(fullCatalogCount);
    //
    //     await searchFilter.clearSearch();
    //     await searchFilter.waitForSearch();
    //     await catalogPage.waitProductsLoaded();
    //
    //     expect(await catalogPage.productCount()).toBe(fullCatalogCount);
    // });

    test('should display empty message for unknown product', async () => {

        await searchFilter.search('xxxxxxxxxxxxxxxx');
        await searchFilter.waitForSearch();

        await expect(searchFilter.emptyMessage).toBeVisible();
    });

    test('should update search results dynamically', async () => {

        await searchFilter.search('Hammer');
        const firstSearch = await catalogPage.getProductNames();

        await searchFilter.search('Saw');
        await searchFilter.waitForSearch();
        const secondSearch = await catalogPage.getProductNames();

        expect(firstSearch).not.toEqual(secondSearch);
    });

    test('should perform case insensitive search', async () => {

        await searchFilter.search('HAMMER');
        await searchFilter.waitForSearch();

        const products = await catalogPage.getProductNames();

        expect(products.length).toBeGreaterThan(0);
        expect(products).toContainEqual(expect.stringMatching(/hammer/i));
    });

    test('should display matching keyword in product names', async () => {
        const keyword = 'Ham';

        await searchFilter.search(keyword);
        await searchFilter.waitForSearch();

        const products = await catalogPage.getProductNames();

        expect(products.length).toBeGreaterThan(0);

        products.forEach(product => {

            expect(
                product.toLowerCase()
            ).toContain(
                keyword.toLowerCase()
            );

        });
    });

});