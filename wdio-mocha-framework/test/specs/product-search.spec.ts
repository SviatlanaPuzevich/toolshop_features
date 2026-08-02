import CatalogPage from '../pageobjects/catalog.page.ts';

describe('Product Search', () => {
  let initialNames: string[];

  beforeEach(async () => {
    await CatalogPage.open();
    await CatalogPage.waitForProductsLoaded();
    initialNames = await CatalogPage.getProductNames();
  });

  it('should find a product by its exact name', async () => {
    const exactName = initialNames[0];

    await CatalogPage.search(exactName);
    await CatalogPage.waitForProductsToChange(initialNames);

    const names = await CatalogPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain(exactName);
  });

  it('should find products by a partial name (more than 3 characters)', async () => {
    await CatalogPage.search('Saw');
    await CatalogPage.waitForProductsToChange(initialNames);

    const names = await CatalogPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => {
      expect(name.toLowerCase()).toContain('saw');
    });
  });

  it('should display a message when no products are found', async () => {
    await CatalogPage.search('zzzqqqnomatch123');

    await CatalogPage.noResults.waitForDisplayed({ timeout: 10000 });
    await expect(CatalogPage.noResults).toBeDisplayed();
    await expect(CatalogPage.productCards).toBeElementsArrayOfSize(0);
  });

  it('should restore the full catalog after clearing the search', async () => {
    await CatalogPage.search('Saw');
    await CatalogPage.waitForProductsToChange(initialNames);
    expect(await CatalogPage.getProductNames()).not.toEqual(initialNames);

    await CatalogPage.clearSearch();

    await browser.waitUntil(
      async () =>
        JSON.stringify(await CatalogPage.getProductNames()) === JSON.stringify(initialNames),
      { timeout: 5000, timeoutMsg: 'Catalog was not restored after clearing the search' }
    );

    expect(await CatalogPage.getProductNames()).toEqual(initialNames);
  });

  it('should update results dynamically when the query changes', async () => {
    await CatalogPage.search('Saw');
    await CatalogPage.waitForProductsToChange(initialNames);
    const sawResults = await CatalogPage.getProductNames();

    await CatalogPage.searchInput.clearValue();
    await CatalogPage.search('Pliers');
    await CatalogPage.waitForProductsToChange(sawResults);
    const pliersResults = await CatalogPage.getProductNames();

    expect(pliersResults).not.toEqual(sawResults);
    pliersResults.forEach((name) => {
      expect(name.toLowerCase()).toContain('pliers');
    });
  });

  it('should be case insensitive', async () => {
    await CatalogPage.search('PLIERS');
    await CatalogPage.waitForProductsToChange(initialNames);

    const names = await CatalogPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => {
      expect(name.toLowerCase()).toContain('pliers');
    });
  });

  it('should return results that contain the searched keyword in the name', async () => {
    await CatalogPage.search('Hammer');
    await CatalogPage.waitForProductsToChange(initialNames);

    const names = await CatalogPage.getProductNames();

    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => {
      expect(name.toLowerCase()).toContain('hammer');
    });
  });
});
