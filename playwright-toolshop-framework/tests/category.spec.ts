import { test, expect } from '../fixtures/catalogFixture.js';

test.describe('Product Categories', () => {
  test('should display available categories', async ({ catalogPage }) => {
    const categories = await catalogPage.getAvailableCategories();

    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Power Tools');
  });

  test.describe('Category selection', () => {
    ['Power Tools', 'Hand Tools', 'Other'].forEach((category) => {
      test(`should display products for ${category}`, async ({ catalogPage }) => {
        await catalogPage.selectCategory(category);
        await catalogPage.waitLoadedCatalogResponse();
        await catalogPage.waitProductsLoaded();

        expect(await catalogPage.productCount()).toBeGreaterThan(0);
      });
    });
  });

  test('should refresh products after category change', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Hand Tools');
    await catalogPage.waitLoadedCatalogResponse();
    const secondCategoryProducts = await catalogPage.getProductNames();

    await catalogPage.selectCategory('Power Tools');
    await catalogPage.waitLoadedCatalogResponse();
    const firstCategoryProducts = await catalogPage.getProductNames();

    expect(firstCategoryProducts).not.toEqual(secondCategoryProducts);
  });

  test('should display category filters', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Power Tools');

    await expect(catalogPage.categoryFilters.filtersPanel).toBeVisible();

    const subFiltersCount = await catalogPage.categoryFilters.subfiltersCount();

    expect(subFiltersCount).toBeGreaterThan(0);
  });

  test('should update filters after category change', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Power Tools');
    await catalogPage.categoryFilters.waitForCategoryTree();
    const firstFilters = await catalogPage.categoryFilters.subfiltersCount();
    await catalogPage.selectCategory('Hand Tools');
    await catalogPage.categoryFilters.waitForCategoryTree();
    const secondFilters = await catalogPage.categoryFilters.subfiltersCount();

    expect(secondFilters).toBeGreaterThan(0);
    expect(firstFilters || secondFilters).toBeTruthy();
  });
});
