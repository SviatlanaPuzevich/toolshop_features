import BasketPage from '../pageobjects/basket.page';
import ProductPage from '../pageobjects/product.page';
import { User } from '../../types/types.ts';
import { createUser } from '../../utils/registrationHelper.ts';
import LoginPage from '../pageobjects/login.page.ts';
import AccountPage from '../pageobjects/account.page.ts';
import HomePage from '../pageobjects/home.page.ts';

describe('Basket Management', () => {
  let user: User;

  before(async () => {
    user = await createUser();

    await LoginPage.open();
    await LoginPage.login(user.email, user.password);
    await AccountPage.navMenu.waitForDisplayed({ timeout: 5000 });
  });

  beforeEach(async () => {
    await HomePage.open();
    await HomePage.selectProductCard(0);
    await ProductPage.addProductToBasket();
    await BasketPage.open();
  });

  describe('Basket display', () => {
    it('should display basket products correctly', async () => {
      await expect(BasketPage.productNames[0]).toBeDisplayed();

      await expect(BasketPage.productPrices[0]).toBeDisplayed();

      await expect(BasketPage.quantityInputs[0]).toBeDisplayed();

      await expect(BasketPage.totalPrice).toBeDisplayed();

      await expect(BasketPage.continueShoppingButton).toBeDisplayed();

      await expect(BasketPage.checkoutButton).toBeDisplayed();
    });

    it('should display empty basket correctly', async () => {
      await BasketPage.removeAllProducts();
      await BasketPage.emptyBasketMessage.waitForDisplayed({ timeout: 3000 });
      await expect(BasketPage.checkoutButton).not.toBeDisplayed();
      await expect(BasketPage.emptyBasketMessage).toBeDisplayed();
    });
  });

  describe('Product quantity', () => {
    it('should update prices when quantity increases', async () => {
      const initialItemTotal = await BasketPage.getItemTotal(0);
      const initialBasketTotal = await BasketPage.getBasketTotal();

      await BasketPage.setQuantity(0, 3);
      await browser.waitUntil(async () => (await BasketPage.getItemTotal(0)) > initialItemTotal);
      const updatedItemTotal = await BasketPage.getItemTotal(0);
      const updatedBasketTotal = await BasketPage.getBasketTotal();

      expect(updatedItemTotal).toBeGreaterThan(initialItemTotal);

      expect(updatedBasketTotal).toBeGreaterThan(initialBasketTotal);
    });

    it('should not allow quantity less than 1', async () => {
      const initialTotal = await BasketPage.getBasketTotal();

      await BasketPage.setQuantity(0, 0);

      await expect(BasketPage.quantityInputs[0]).toHaveValue('1');

      expect(await BasketPage.getBasketTotal()).toEqual(initialTotal);
    });
  });

  describe('Remove products', () => {
    it('should remove last product from basket', async () => {
      await BasketPage.removeProduct(0);

      await expect(BasketPage.successAlert).toBeDisplayed();

      await expect(BasketPage.emptyBasketMessage).toBeDisplayed();
    });

    it('should remove one of multiple products', async () => {
      await HomePage.open();
      await HomePage.selectProductCard(1);
      await ProductPage.addProductToBasket();
      await BasketPage.open();
      await BasketPage.productNames[0].waitForDisplayed({ timeout: 3000 });

      const initialCount = await BasketPage.productNames.length;
      const removedProductName = await BasketPage.productNames[0].getText();

      await BasketPage.removeProduct(0);

      await expect(BasketPage.productNames).toBeElementsArrayOfSize(initialCount - 1);

      const remainingProducts = await BasketPage.productNames.map((el) => el.getText());

      expect(remainingProducts).not.toContain(removedProductName);

      const total = await BasketPage.getBasketTotal();

      expect(total).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('should continue shopping', async () => {
      const initialCount = await BasketPage.productNames.length;

      await BasketPage.continueShoppingButton.click();

      expect(await browser.getUrl()).not.toContain('/checkout');

      await BasketPage.open();
      await BasketPage.productNames[0].waitForDisplayed({ timeout: 3000 });

      const count = await BasketPage.productNames.length;

      expect(initialCount).toEqual(count);
    });
  });
});
