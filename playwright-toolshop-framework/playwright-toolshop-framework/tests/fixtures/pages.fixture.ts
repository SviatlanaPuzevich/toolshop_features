import { Page, test as base } from '@playwright/test';
import {
  CartPage,
  CatalogPage,
  CheckoutPage,
  LoginPage,
  ProductPage,
  RegisterPage,
} from '../../business/index.js';

export type PageObjectFixtures = {
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

type PageObjectConstructor<T> = new (page: Page) => T;

/** Builds a fixture that hands a freshly created page object to the test. */
const provide =
  <T>(PageObjectClass: PageObjectConstructor<T>) =>
  async ({ page }: { page: Page }, use: (pageObject: T) => Promise<void>): Promise<void> => {
    await use(new PageObjectClass(page));
  };

/** Page objects, ready to use and not navigated anywhere yet. */
export const test = base.extend<PageObjectFixtures>({
  catalogPage: provide(CatalogPage),
  productPage: provide(ProductPage),
  cartPage: provide(CartPage),
  checkoutPage: provide(CheckoutPage),
  loginPage: provide(LoginPage),
  registerPage: provide(RegisterPage),
});
