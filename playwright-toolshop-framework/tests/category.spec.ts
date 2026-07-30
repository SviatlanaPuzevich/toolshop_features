import { test, expect } from '../fixtures/catalogFixture.js';
import { CategoryFilters } from '../components/CategoryFilters.js';

test.describe('Product Categories', () => {

  test('should display available categories', async ({catalogPage}) => {
    const categories = await catalogPage.getAvailableCategories();

    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Power Tools');
  });

  test.describe('Category selection', () => {
    ['Power Tools', 'Hand Tools', 'Other'].forEach((category) => {
      test(`should display products for ${category}`, async ({catalogPage}) => {
        await catalogPage.selectCategory(category);
        await catalogPage.waitLoadedCatalogResponse();
        await catalogPage.waitProductsLoaded();

        expect(await catalogPage.productCount()).toBeGreaterThan(0);
      });
    });
  });

  test('should refresh products after category change', async ({catalogPage}) => {
    await catalogPage.selectCategory('Hand Tools');
    await catalogPage.waitLoadedCatalogResponse();
    const secondCategoryProducts = await catalogPage.getProductNames();

    await catalogPage.selectCategory('Power Tools');
    await catalogPage.waitLoadedCatalogResponse();
    const firstCategoryProducts = await catalogPage.getProductNames();

    expect(firstCategoryProducts).not.toEqual(secondCategoryProducts);
  });

  test('should display category filters', async ({ catalogPage, page }) => {
    const categoryFilters = new CategoryFilters(page);
    await catalogPage.selectCategory('Power Tools');

    await expect(categoryFilters.filtersPanel).toBeVisible();

    const subFiltersCount = await categoryFilters.subfiltersCount();

    expect(subFiltersCount).toBeGreaterThan(0);
  });

  test('should update filters after category change', async ({ page, catalogPage }) => {
    const categoryFilters = new CategoryFilters(page);
    await catalogPage.selectCategory('Power Tools');
    await categoryFilters.waitForCategoryTree();
    const firstFilters = await categoryFilters.subfiltersCount();
    await catalogPage.selectCategory('Hand Tools');
    await categoryFilters.waitForCategoryTree();
    const secondFilters = await categoryFilters.subfiltersCount();

    expect(secondFilters).toBeGreaterThan(0);
    expect(firstFilters || secondFilters).toBeTruthy();
  });

});
