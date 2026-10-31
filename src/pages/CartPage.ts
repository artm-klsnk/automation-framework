import { expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly quantityLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.quantityLabel = page.getByTestId('cart-quantity-label');
    this.descriptionLabel = page.getByTestId('cart-desc-label');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async expectPageElementsVisible() {
    await expect(this.title).toBeVisible();
    await expect(this.quantityLabel).toBeVisible();
    await expect(this.descriptionLabel).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    await this.footer.expectVisible();
  }

  async expectPageElementsVisibleNoProductsAddedToCart() {
    await this.expectPageElementsVisible();
    await expect(this.cartItems).toHaveCount(0);
  }
}