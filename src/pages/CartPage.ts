import { expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { products } from '@data/products';
import type { Product } from '@pages/ProductsPage';

export class CartItem {
  readonly page: Page;
  readonly slug: string;
  readonly quantity: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, slug: string) {
    this.page = page;
    this.slug = slug;
    this.removeButton = page.getByTestId(`remove-${slug}`);
    const container = page.getByTestId('inventory-item').filter({ has: this.removeButton });
    this.quantity = container.getByTestId('item-quantity');
    this.description = container.getByTestId('inventory-item-desc');
    this.price = container.getByTestId('inventory-item-price');
  }

  async remove() {
    await this.removeButton.click();
  }

  async expectShown(description: string, price: string, quantity: string) {
    await expect(this.description).toHaveText(description);
    await expect(this.price).toHaveText(price);
    await expect(this.quantity).toHaveText(quantity);
    await expect(this.removeButton).toBeVisible();
  }

  async expectRemoved() {
    await expect(this.removeButton).toBeHidden();
  }
}

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly quantityLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly footer: Footer;
  readonly items: Record<Product, CartItem>;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.quantityLabel = page.getByTestId('cart-quantity-label');
    this.descriptionLabel = page.getByTestId('cart-desc-label');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.footer = new Footer(page);
    this.items = Object.fromEntries(
      Object.entries(products).map(([name, slug]) => [name, new CartItem(page, slug)])
    ) as Record<Product, CartItem>;
  }

  item(product: Product) {
    return this.items[product];
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

  async removeFromCart(...items: Product[]) {
    for (const item of items) {
      await this.item(item).remove();
    }
  }

  async removeAllProductsFromCart() {
    await this.removeFromCart(...(Object.keys(this.items) as Product[]));
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

  async expectItemInCart(product: Product, description: string, price: string, quantity: number) {
    await this.item(product).expectShown(description, price, String(quantity));
  }

  async expectItemsNotInCart(...items: Product[]) {
    for (const item of items) {
      await this.item(item).expectRemoved();
    }
  }

  async expectCartBadgeCount(count: number) {
    if (count === 0) {
      await expect(this.shoppingCartBadge).toHaveCount(0);
    } else {
      await expect(this.shoppingCartBadge).toHaveText(String(count));
    }
  }
}