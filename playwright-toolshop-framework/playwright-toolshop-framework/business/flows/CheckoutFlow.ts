import { CartPage } from '../pages/CartPage.js';
import { CatalogPage } from '../pages/CatalogPage.js';
import { ProductPage } from '../pages/ProductPage.js';

/** Brings a shopper from the catalog to the sign in step of the checkout. */
export class CheckoutFlow {
  constructor(
    private readonly catalogPage: CatalogPage,
    private readonly productPage: ProductPage,
    private readonly cartPage: CartPage,
  ) {}

  public async startCheckoutWithFirstProduct(): Promise<void> {
    await this.catalogPage.open();
    await this.catalogPage.openFirstProduct();

    await this.productPage.waitUntilLoaded();
    await this.productPage.addToCart();

    await this.cartPage.open();
    await this.cartPage.proceedToCheckout();
  }
}
