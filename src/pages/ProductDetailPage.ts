import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly name: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByTestId('inventory-item-name');
  }

  async expectShowsProduct(name: string) {
    await expect(this.page).toHaveURL(/\/inventory-item\.html\?id=\d+/);
    await expect(this.name).toHaveText(name);
  }
}