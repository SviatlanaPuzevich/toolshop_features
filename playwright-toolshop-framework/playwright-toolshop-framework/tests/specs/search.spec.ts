import { expect, test } from '../fixtures/index.js';

const SEARCHED_PRODUCT = 'Hammer';
const PARTIAL_QUERY = 'Ham';
const TOO_SHORT_QUERIES = ['H', 'Ha'];
const UNKNOWN_PRODUCT = 'xxxxxxxxxxxxxxxx';

test.describe('Product search', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.open();
  });

  test('should find a product by its full name', async ({ catalogPage }) => {
    await catalogPage.search.searchFor(SEARCHED_PRODUCT);

    await expect
      .poll(() => catalogPage.getProductNames())
      .toContainEqual(expect.stringMatching(new RegExp(SEARCHED_PRODUCT, 'i')));
  });

  test('should find products by a part of their name', async ({ catalogPage }) => {
    await catalogPage.search.searchFor(PARTIAL_QUERY);

    const productNames = await catalogPage.getProductNames();

    expect(productNames.length).toBeGreaterThan(0);
    productNames.forEach((name) =>
      expect(name.toLowerCase()).toContain(PARTIAL_QUERY.toLowerCase()),
    );
  });

  test('should ignore the case of the query', async ({ catalogPage }) => {
    await catalogPage.search.searchFor(SEARCHED_PRODUCT.toUpperCase());

    await expect
      .poll(() => catalogPage.getProductNames())
      .toContainEqual(expect.stringMatching(new RegExp(SEARCHED_PRODUCT, 'i')));
  });

  test.describe('Minimum query length', () => {
    for (const query of TOO_SHORT_QUERIES) {
      test(`should not search for "${query}"`, async ({ catalogPage, searchRequestSpy }) => {
        const initialProductCount = await catalogPage.getProductCount();

        await catalogPage.search.enterQuery(query);
        await catalogPage.search.submit();

        expect(searchRequestSpy.requestCount).toBe(0);
        expect(await catalogPage.getProductCount()).toBe(initialProductCount);
      });
    }
  });

  test('should show the whole catalog again after the search is cleared', async ({
    catalogPage,
  }) => {
    const fullCatalogCount = await catalogPage.getProductCount();

    await catalogPage.search.searchFor(SEARCHED_PRODUCT);
    await expect.poll(() => catalogPage.getProductCount()).toBeLessThan(fullCatalogCount);

    await catalogPage.search.reset();
    await expect.poll(() => catalogPage.getProductCount()).toBe(fullCatalogCount);
  });

  test('should tell that nothing matches an unknown product', async ({ catalogPage }) => {
    await catalogPage.search.searchFor(UNKNOWN_PRODUCT);

    await expect(catalogPage.noProductsFoundMessage).toBeVisible();
  });

  test('should replace the results of the previous search', async ({ catalogPage }) => {
    await catalogPage.search.searchFor(SEARCHED_PRODUCT);
    const hammerResults = await catalogPage.getProductNames();

    await catalogPage.search.searchFor('Saw');

    await expect.poll(() => catalogPage.getProductNames()).not.toEqual(hammerResults);
  });
});
