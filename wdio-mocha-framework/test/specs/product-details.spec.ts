import CatalogPage from '../pageobjects/catalog.page.ts';
import ProductPage from '../pageobjects/product.page.ts';
import LoginPage from '../pageobjects/login.page.ts';
import AccountPage from '../pageobjects/account.page.ts';
import { createUser } from '../../utils/registrationHelper.ts';
import { User } from '../../types/types.ts';

async function openProduct(index = 0) {
  await CatalogPage.open();
  await CatalogPage.waitForProductsLoaded();
  await CatalogPage.productCards[index].click();
  await ProductPage.productName.waitForDisplayed({ timeout: 5000 });
}

describe('Product Details Page', () => {
  describe('Product information', () => {
    beforeEach(async () => {
      await openProduct(0);
    });

    it('should display the main product information', async () => {
      await expect(ProductPage.productImage).toBeDisplayed();
      await expect(ProductPage.productName).toBeDisplayed();
      await expect(ProductPage.productDescription).toBeDisplayed();
      await expect(ProductPage.unitPrice).toBeDisplayed();
      await expect(ProductPage.co2Badge).toBeDisplayed();
      await expect(ProductPage.specsTable).toBeDisplayed();
      expect(await ProductPage.specRows.length).toBeGreaterThan(0);
    });

    it('should display the related products section', async () => {
      await ProductPage.relatedProductCards[0].waitForDisplayed({ timeout: 5000 });

      expect(await ProductPage.relatedProductCards.length).toBeGreaterThan(0);
    });
  });

  describe('Product quantity', () => {
    beforeEach(async () => {
      await openProduct(0);
    });

    it('should increase the quantity', async () => {
      expect(await ProductPage.getQuantity()).toBe(1);

      await ProductPage.increaseQuantity();

      expect(await ProductPage.getQuantity()).toBe(2);
    });

    it('should decrease the quantity', async () => {
      await ProductPage.increaseQuantity();
      expect(await ProductPage.getQuantity()).toBe(2);

      await ProductPage.decreaseQuantity();

      expect(await ProductPage.getQuantity()).toBe(1);
    });

    it('should not allow the quantity to be less than 1', async () => {
      expect(await ProductPage.getQuantity()).toBe(1);

      if (await ProductPage.decreaseQuantityButton.isEnabled()) {
        await ProductPage.decreaseQuantity();
      }

      expect(await ProductPage.getQuantity()).toBe(1);
    });

    it('should accept a typed quantity', async () => {
      await ProductPage.setQuantity(17);

      expect(await ProductPage.getQuantity()).toBe(17);
    });
  });

  describe('Add to basket', () => {
    beforeEach(async () => {
      await openProduct(0);
    });

    it('should add a product to the basket and update the counter', async () => {
      const before = await ProductPage.getCartCount();

      await ProductPage.addProductToBasket();

      await expect(ProductPage.toastMessage).toBeDisplayed();
      await browser.waitUntil(async () => (await ProductPage.getCartCount()) === before + 1, {
        timeout: 5000,
        timeoutMsg: 'Cart counter was not incremented by 1',
      });
    });

    it('should add multiple units of a product to the basket', async () => {
      const before = await ProductPage.getCartCount();

      await ProductPage.setQuantity(3);
      await ProductPage.addProductToBasket();

      await browser.waitUntil(async () => (await ProductPage.getCartCount()) === before + 3, {
        timeout: 5000,
        timeoutMsg: 'Cart counter was not incremented by 3',
      });
    });
  });

  describe('Product comparison', () => {
    beforeEach(async () => {
      await openProduct(0);
    });

    it('should expose a usable add-to-compare control', async () => {
      await expect(ProductPage.addToCompareButton).toBeDisplayed();
      await expect(ProductPage.addToCompareButton).toBeEnabled();

      await ProductPage.addToCompareButton.click();

      await expect(ProductPage.addToCompareButton).toBeDisplayed();
    });
  });

  describe('Favorites', () => {
    let user: User;

    before(async () => {
      user = await createUser();
      await LoginPage.open();
      await LoginPage.login(user.email, user.password);
      await AccountPage.navMenu.waitForDisplayed({ timeout: 10000 });
    });

    it('should add a product to the favorites list', async () => {
      await openProduct(1);

      await ProductPage.addToFavorites();

      await expect(ProductPage.toastMessage).toBeDisplayed();
    });

    it('should not allow adding the same product to favorites twice', async () => {
      await openProduct(2);

      await ProductPage.addToFavorites();
      await ProductPage.toastMessage.waitForDisplayed({ reverse: true, timeout: 8000 });

      await ProductPage.addToFavoritesButton.click();
      await ProductPage.toastMessage.waitForDisplayed({ timeout: 5000 });

      expect((await ProductPage.toastMessage.getText()).toLowerCase()).toContain('already');
    });
  });

  describe('Out of stock products', () => {
    it('should disable the quantity and add-to-basket controls', async () => {
      await CatalogPage.open();
      await CatalogPage.waitForProductsLoaded();

      const outOfStockCard = $('//a[contains(@class, "card")][.//span[@data-test="out-of-stock"]]');
      await outOfStockCard.waitForExist({ timeout: 10000 });
      await outOfStockCard.click();
      await ProductPage.productName.waitForDisplayed({ timeout: 10000 });

      await expect(ProductPage.addProductToBasketButton).toBeDisabled();
      await expect(ProductPage.increaseQuantityButton).toBeDisabled();
      await expect(ProductPage.decreaseQuantityButton).toBeDisabled();
    });
  });
});
