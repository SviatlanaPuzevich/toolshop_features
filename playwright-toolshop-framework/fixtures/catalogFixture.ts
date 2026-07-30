import { test as base } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';
import {SearchFilter} from "../components/SearchFilter.js";

export type CatalogFixture = {
  catalogPage: CatalogPage;
  searchFilter: SearchFilter;
};

export const test = base.extend<CatalogFixture>({
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.open();
    await use(catalogPage);
  },
  searchFilter: async({page}, use)=>{
    const searchFilter = new SearchFilter(page);
    await use(searchFilter);
  }
});

export { expect } from '@playwright/test';
