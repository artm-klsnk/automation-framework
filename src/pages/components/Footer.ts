import { expect, Locator, Page } from '@playwright/test';

export class Footer {
  readonly container: Locator;
  readonly xLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copy: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('footer');
    this.xLink = page.getByTestId('social-x');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.copy = page.getByTestId('footer-copy');
  }

  async expectVisible() {
    await expect(this.container).toBeVisible();
    await expect(this.xLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.copy).toBeVisible();
  }
}