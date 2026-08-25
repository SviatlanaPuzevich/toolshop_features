import { expect, test } from '../fixtures/catalogFixture.js';

test.describe('Product Search', () => {
  test('should search product by exact name', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.searchFilter.search('Hammer');
    await catalogPage.waitSearchResponse();
    const products = await catalogPage.getProductNames();

    expect(products).toContainEqual(expect.stringMatching(/hammer/i));
  });

  test('should search product by partial name', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.searchFilter.search('Ham');
    await catalogPage.waitSearchResponse();

    const products = await catalogPage.getProductNames();

    expect(products.length).toBeGreaterThan(0);

    products.forEach((product) => expect(product.toLowerCase()).toContain('ham'));
  });

  test.describe('Minimum search length', () => {
    ['H', 'Ha'].forEach((query) => {
      test(`should not trigger search for "${query}"`, async ({ catalogPage }) => {
        await catalogPage.open();
        await catalogPage.waitProductsLoaded();
        const initialCount = await catalogPage.productCount();
        await catalogPage.searchFilter.search(query);

        expect(await catalogPage.productCount()).toBe(initialCount);
      });
    });
  });

  test('should clear search results', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.waitProductsLoaded();
    const fullCatalogCount = await catalogPage.productCount();
    await catalogPage.searchFilter.search('Hammer');
    await catalogPage.waitSearchResponse();

    expect(await catalogPage.productCount()).toBeLessThan(fullCatalogCount);

    await catalogPage.searchFilter.clearSearch();
    await catalogPage.waitLoadedCatalogResponse();

    expect(await catalogPage.productCount()).toBe(fullCatalogCount);
  });

  test('should display empty message for unknown product', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.searchFilter.search('xxxxxxxxxxxxxxxx');
    await catalogPage.waitSearchResponse();

    await expect(catalogPage.searchFilter.emptyMessage).toBeVisible();
  });

  test('should update search results dynamically', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.searchFilter.search('Hammer');
    const firstSearch = await catalogPage.getProductNames();

    await catalogPage.searchFilter.search('Saw');
    await catalogPage.waitSearchResponse();
    const secondSearch = await catalogPage.getProductNames();

    expect(firstSearch).not.toEqual(secondSearch);
  });

  test('should perform case insensitive search', async ({ catalogPage }) => {
    await catalogPage.open();
    await catalogPage.searchFilter.search('HAMMER');
    await catalogPage.waitSearchResponse();

    const products = await catalogPage.getProductNames();

    expect(products.length).toBeGreaterThan(0);
    expect(products).toContainEqual(expect.stringMatching(/hammer/i));
  });

  test('should display matching keyword in product names', async ({ catalogPage }) => {
    const keyword = 'Ham';

    await catalogPage.open();
    await catalogPage.searchFilter.search(keyword);
    await catalogPage.waitSearchResponse();
    const products = await catalogPage.getProductNames();

    expect(products.length).toBeGreaterThan(0);
    products.forEach((product) => {
      expect(product.toLowerCase()).toContain(keyword.toLowerCase());
    });
  });
});
