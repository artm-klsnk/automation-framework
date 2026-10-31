import { expect, Locator, Page } from '@playwright/test';
import { products } from '@data/products';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductCard {
  readonly page: Page;
  readonly slug: string;
  readonly image: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, slug: string) {
    this.page = page;
    this.slug = slug;
    this.image = page.getByTestId(`inventory-item-${slug}-img`);
    this.addToCartButton = page.getByTestId(`add-to-cart-${slug}`);
    this.removeButton = page.getByTestId(`remove-${slug}`);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectVisible() {
    await expect(this.image).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectInCart() {
    await expect(this.addToCartButton).toBeHidden();
    await expect(this.removeButton).toBeVisible();
  }
}

export class ProductsPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logo: Locator;
  readonly shoppingCartLink: Locator;
  readonly title: Locator;
  readonly sortContainer: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDesc: Locator;
  readonly inventoryItemPrice: Locator;
  readonly footer: Locator;
  readonly xLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopy: Locator;
  readonly shoppingCartBadge: Locator;
  readonly productCards: ProductCard[];

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logo = page.locator('.app_logo');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.title = page.getByTestId('title');
    this.sortContainer = page.getByTestId('product-sort-container');
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.inventoryItemName = page.getByTestId('inventory-item-name');
    this.inventoryItemDesc = page.getByTestId('inventory-item-desc');
    this.inventoryItemPrice = page.getByTestId('inventory-item-price');
    this.footer = page.getByTestId('footer');
    this.xLink = page.getByTestId('social-x');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.footerCopy = page.getByTestId('footer-copy');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.productCards = Object.values(products).map((slug) => new ProductCard(page, slug));
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async selectSortOption(option: SortOption) {
    await this.sortContainer.selectOption(option);
  }

  async addAllProductsToCart() {
    for (const product of this.productCards) {
      await product.addToCart();
    }
  }

  async expectPageElementsVisible() {
    await expect(this.menuButton).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.sortContainer).toBeVisible();
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryItemDesc.first()).toBeVisible();
    await expect(this.inventoryItemPrice.first()).toBeVisible();
    for (const product of this.productCards) {
      await product.expectVisible();
    }
    await expect(this.footer).toBeVisible();
    await expect(this.xLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }

  async expectCartBadgeCount() {
    await expect(this.shoppingCartBadge).toHaveText(String(this.productCards.length));
  }

  async expectAllAddToCartButtonsChangedToRemove() {
    for (const product of this.productCards) {
      await product.expectInCart();
    }
  }

  async expectItemsSortedByNameAscending() {
    const names = await this.inventoryItemName.allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  }

  async expectItemsSortedByNameDescending() {
    const names = await this.inventoryItemName.allTextContents();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  }

  async expectItemsSortedByPriceAscending() {
    const prices = await this.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  }

  async expectItemsSortedByPriceDescending() {
    const prices = await this.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }

  private async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrice.allTextContents();
    return priceTexts.map((price) => parseFloat(price.replace('$', '')));
  }
}