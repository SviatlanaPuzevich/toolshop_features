import { should } from 'chai';
import HomePage from '../pageobjects/home.page';


should();



describe('Language Switching', () => {

  beforeEach(async () => {
    await HomePage.open('');
  });

  const translations = {
    DE: {
      categories: 'Kategorien'
    },
    EL: {
      categories: 'Κατηγορίες'
    },
    EN: {
      categories: 'Categories'
    },
    ES: {
      categories: 'Categorías'
    },
    FR: {
      categories: 'Catégories'
    },
    NL: {
      categories: 'Categorieën'
    },
    TR: {
      categories: 'Kategoriler'
    }
  };

  describe('User changes application language', () => {

    Object.entries(translations).forEach(
      ([language, expected]) => {

        it(`should switch application to ${language}`, async () => {

          await HomePage.selectLanguage(language);

          await browser.waitUntil(
            async () =>
              (await HomePage.menuCategories.getText()) ===
              expected.categories,
            {
              timeout: 5000,
              timeoutMsg: `Language ${language} was not applied`
            }
          );

          const actualText =
            await HomePage.menuCategories.getText();

          actualText.should.equal(
            expected.categories
          );
        });
      }
    );
  });

  describe('Interface translation', () => {

    it('should translate interface but not product catalog', async () => {

      const initialProductName =
        await HomePage.productCards[0].getText();

      await HomePage.selectLanguage('DE');

      await browser.waitUntil(
        async () =>
          (await HomePage.menuCategories.getText()) ===
          'Kategorien'
      );

      const translatedMenu =
        await HomePage.menuCategories.getText();

      translatedMenu.should.equal(
        'Kategorien'
      );

      const translatedProductName =
        await HomePage.productCards[0].getText();

      translatedProductName.should.equal(
        initialProductName
      );
    });
  });

  describe('Available languages', () => {

    it('should display all available languages', async () => {

      await HomePage.languageSelector.click();

      const languages =
        await HomePage.availableLanguages.map(
          async element => element.getText()
        );

      const actualLanguages =
        await Promise.all(languages);

      actualLanguages.should.deep.equal([
        'DE',
        'EL',
        'EN',
        'ES',
        'FR',
        'NL',
        'TR'
      ]);
    });
  });
});