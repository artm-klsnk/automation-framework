import { expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { Header } from '@pages/components/Header';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly header: Header;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/checkout-complete.html');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async expectOrderComplete() {
    await this.header.expectVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.backToProductsButton).toBeVisible();
    await this.footer.expectVisible();
  }
}