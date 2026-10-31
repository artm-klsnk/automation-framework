import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly menuButton: Locator;
  readonly logo: Locator;
  readonly title: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logo = page.locator('.app_logo');
    this.title = page.getByTestId('title');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  async expectVisible() {
    await expect(this.menuButton).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async expectCartBadgeCount(count: number) {
    if (count === 0) {
      await expect(this.shoppingCartBadge).toHaveCount(0);
    } else {
      await expect(this.shoppingCartBadge).toHaveText(String(count));
    }
  }
}