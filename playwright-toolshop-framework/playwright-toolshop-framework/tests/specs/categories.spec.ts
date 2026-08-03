import { expect, test } from '../fixtures/index.js';

const CATEGORIES = ['Power Tools', 'Hand Tools', 'Other'];

test.describe('Product categories', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.open();
  });

  test('should offer the shop categories in the navigation', async ({ catalogPage }) => {
    const availableCategories = await catalogPage.getAvailableCategories();

    expect(availableCategories).toEqual(expect.arrayContaining(CATEGORIES));
  });

  for (const category of CATEGORIES) {
    test(`should show the products of ${category}`, async ({ catalogPage }) => {
      await catalogPage.selectCategory(category);

      await expect(catalogPage.products).not.toHaveCount(0);
    });
  }

  test('should show other products after another category is opened', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Hand Tools');
    const handToolProducts = await catalogPage.getProductNames();

    await catalogPage.selectCategory('Power Tools');

    await expect.poll(() => catalogPage.getProductNames()).not.toEqual(handToolProducts);
  });

  test('should show the sub categories of the opened category as filters', async ({
    catalogPage,
  }) => {
    await catalogPage.selectCategory('Power Tools');

    await expect(catalogPage.categoryFilters.categorySection).toBeVisible();
    await expect(catalogPage.categoryFilters.subCategoryFilters).not.toHaveCount(0);
  });

  test('should replace the filters after another category is opened', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Power Tools');
    const powerToolFilters = await catalogPage.categoryFilters.getSubCategoryNames();

    await catalogPage.selectCategory('Hand Tools');

    expect(powerToolFilters.length).toBeGreaterThan(0);
    await expect
      .poll(() => catalogPage.categoryFilters.getSubCategoryNames())
      .not.toEqual(powerToolFilters);
  });
});
