import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logo: Locator;
  readonly shoppingCartLink: Locator;
  readonly title: Locator;
  readonly sortContainer: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItemDesc: Locator;
  readonly inventoryItemPrice: Locator;
  readonly backpackImage: Locator;
  readonly addBackpackToCartButton: Locator;
  readonly footer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logo = page.locator('.app_logo');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.title = page.getByTestId('title');
    this.sortContainer = page.getByTestId('product-sort-container');
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.inventoryItemDesc = page.getByTestId('inventory-item-desc');
    this.inventoryItemPrice = page.getByTestId('inventory-item-price');
    this.backpackImage = page.getByTestId('inventory-item-sauce-labs-backpack-img');
    this.addBackpackToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.footer = page.getByTestId('footer');
    this.twitterLink = page.getByTestId('social-twitter');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.footerCopy = page.getByTestId('footer-copy');
  }

  async goto() {
    await this.page.goto('/inventory.html');
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
    await expect(this.backpackImage).toBeVisible();
    await expect(this.addBackpackToCartButton).toBeVisible();
    await expect(this.footer).toBeVisible();
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }
}