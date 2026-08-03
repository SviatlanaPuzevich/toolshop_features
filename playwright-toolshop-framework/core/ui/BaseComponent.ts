import { Locator, Page } from '@playwright/test';

/**
 * Root of the component hierarchy. A component owns a part of a page and looks its
 * elements up inside its own root locator, so the same component can be reused on
 * every page that renders it.
 */
export abstract class BaseComponent {
  protected constructor(protected readonly root: Locator) {}

  protected get page(): Page {
    return this.root.page();
  }
}
