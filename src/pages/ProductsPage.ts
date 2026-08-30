import { expect, Locator, Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

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
  readonly backpackImage: Locator;
  readonly addBackpackToCartButton: Locator;
  readonly bikeLightImage: Locator;
  readonly addBikeLightToCartButton: Locator;
  readonly boltTShirtImage: Locator;
  readonly addBoltTShirtToCartButton: Locator;
  readonly fleeceJacketImage: Locator;
  readonly addFleeceJacketToCartButton: Locator;
  readonly onesieImage: Locator;
  readonly addOnesieToCartButton: Locator;
  readonly allTheThingsTShirtImage: Locator;
  readonly addAllTheThingsTShirtToCartButton: Locator;
  readonly footer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopy: Locator;
  readonly shoppingCartBadge: Locator;
  readonly removeBackpackButton: Locator;
  readonly removeBikeLightButton: Locator;
  readonly removeBoltTShirtButton: Locator;
  readonly removeFleeceJacketButton: Locator;
  readonly removeOnesieButton: Locator;
  readonly removeAllTheThingsTShirtButton: Locator;

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
    this.backpackImage = page.getByTestId('inventory-item-sauce-labs-backpack-img');
    this.addBackpackToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.bikeLightImage = page.getByTestId('inventory-item-sauce-labs-bike-light-img');
    this.addBikeLightToCartButton = page.getByTestId('add-to-cart-sauce-labs-bike-light');
    this.boltTShirtImage = page.getByTestId('inventory-item-sauce-labs-bolt-t-shirt-img');
    this.addBoltTShirtToCartButton = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
    this.fleeceJacketImage = page.getByTestId('inventory-item-sauce-labs-fleece-jacket-img');
    this.addFleeceJacketToCartButton = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
    this.onesieImage = page.getByTestId('inventory-item-sauce-labs-onesie-img');
    this.addOnesieToCartButton = page.getByTestId('add-to-cart-sauce-labs-onesie');
    this.allTheThingsTShirtImage = page.getByTestId('inventory-item-test.allthethings()-t-shirt-(red)-img');
    this.addAllTheThingsTShirtToCartButton = page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
    this.footer = page.getByTestId('footer');
    this.twitterLink = page.getByTestId('social-twitter');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.footerCopy = page.getByTestId('footer-copy');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.removeBackpackButton = page.getByTestId('remove-sauce-labs-backpack');
    this.removeBikeLightButton = page.getByTestId('remove-sauce-labs-bike-light');
    this.removeBoltTShirtButton = page.getByTestId('remove-sauce-labs-bolt-t-shirt');
    this.removeFleeceJacketButton = page.getByTestId('remove-sauce-labs-fleece-jacket');
    this.removeOnesieButton = page.getByTestId('remove-sauce-labs-onesie');
    this.removeAllTheThingsTShirtButton = page.getByTestId('remove-test.allthethings()-t-shirt-(red)');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async selectSortOption(option: SortOption) {
    await this.sortContainer.selectOption(option);
  }

  async addAllProductsToCart() {
    await this.addBackpackToCartButton.click();
    await this.addBikeLightToCartButton.click();
    await this.addBoltTShirtToCartButton.click();
    await this.addFleeceJacketToCartButton.click();
    await this.addOnesieToCartButton.click();
    await this.addAllTheThingsTShirtToCartButton.click();
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
    await expect(this.bikeLightImage).toBeVisible();
    await expect(this.addBikeLightToCartButton).toBeVisible();
    await expect(this.boltTShirtImage).toBeVisible();
    await expect(this.addBoltTShirtToCartButton).toBeVisible();
    await expect(this.fleeceJacketImage).toBeVisible();
    await expect(this.addFleeceJacketToCartButton).toBeVisible();
    await expect(this.onesieImage).toBeVisible();
    await expect(this.addOnesieToCartButton).toBeVisible();
    await expect(this.allTheThingsTShirtImage).toBeVisible();
    await expect(this.addAllTheThingsTShirtToCartButton).toBeVisible();
    await expect(this.footer).toBeVisible();
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
  }

  async expectCartBadgeCount(count: number) {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  async expectAllAddToCartButtonsChangedToRemove() {
    await expect(this.addBackpackToCartButton).toBeHidden();
    await expect(this.removeBackpackButton).toBeVisible();
    await expect(this.addBikeLightToCartButton).toBeHidden();
    await expect(this.removeBikeLightButton).toBeVisible();
    await expect(this.addBoltTShirtToCartButton).toBeHidden();
    await expect(this.removeBoltTShirtButton).toBeVisible();
    await expect(this.addFleeceJacketToCartButton).toBeHidden();
    await expect(this.removeFleeceJacketButton).toBeVisible();
    await expect(this.addOnesieToCartButton).toBeHidden();
    await expect(this.removeOnesieButton).toBeVisible();
    await expect(this.addAllTheThingsTShirtToCartButton).toBeHidden();
    await expect(this.removeAllTheThingsTShirtButton).toBeVisible();
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