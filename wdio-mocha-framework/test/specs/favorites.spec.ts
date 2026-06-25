// import FavoritesPage from '../pageobjects/favorites.page';
// import ProductPage from '../pageobjects/product.page';
// import LoginPage from '../pageobjects/login.page';
//
// import { createUser } from '../../utils/registrationHelper.ts';
// import AccountPage from '../pageobjects/account.page.ts';
// import { User } from '../../types/types.ts';
// import HomePage from '../pageobjects/home.page.ts';
//
// describe('Favorite Products', () => {
//   let user: User;
//
//   before(async () => {
//     user = await createUser();
//
//     await LoginPage.open();
//     await LoginPage.login(user.email, user.password);
//     await AccountPage.navMenu.waitForDisplayed({ timeout: 5000 });
//   });
//
//   describe('Favorites display', () => {
//     afterEach(async () => {
//       await FavoritesPage.removeAllFavorites();
//     });
//
//     it('should display empty favorites page', async () => {
//       await FavoritesPage.open();
//
//       await expect(FavoritesPage.emptyFavoritesMessage).toBeDisplayed();
//     });
//
//     it('should display favorite products correctly', async () => {
//       await HomePage.open();
//       await HomePage.selectProductCard(0);
//       await ProductPage.addToFavoritesButton.click();
//
//       await FavoritesPage.open();
//
//       await expect(FavoritesPage.favoriteImages[0]).toBeDisplayed();
//
//       await expect(FavoritesPage.favoriteNames[0]).toBeDisplayed();
//
//       await expect(FavoritesPage.favoriteDescriptions[0]).toBeDisplayed();
//     });
//   });
//
//   describe('Remove favorites', () => {
//     beforeEach(async () => {
//       await HomePage.open();
//       await HomePage.selectProductCard(0);
//       await ProductPage.addToFavoritesButton.click();
//
//       await HomePage.open();
//       await HomePage.selectProductCard(1);
//       await ProductPage.addToFavoritesButton.click();
//
//       await FavoritesPage.open();
//     });
//
//
//     it('should remove product from favorites', async () => {
//       await FavoritesPage.favoriteCards[0].waitForDisplayed({ timeout: 3000 });
//       const initialCount = await FavoritesPage.favoriteCards.length;
//       const firstProductName = await FavoritesPage.favoriteNames[0].getText();
//       const secondProductName = await FavoritesPage.favoriteNames[1].getText();
//
//       await FavoritesPage.removeFavorite(0);
//
//       await expect(FavoritesPage.favoriteCards).toBeElementsArrayOfSize(initialCount - 1);
//
//       const remainingProducts = await FavoritesPage.favoriteNames.map((el) => el.getText());
//
//       expect(remainingProducts).not.toContain(firstProductName);
//
//       expect(remainingProducts).toContain(secondProductName);
//     });
//   });
// });
