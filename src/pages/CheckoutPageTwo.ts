import { expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { Header } from '@pages/components/Header';

export class CheckoutPageTwo {
  readonly page: Page;
  readonly header: Header;
  readonly title: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescLabel: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalInfoLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.cartQuantityLabel = page.getByTestId('cart-quantity-label');
    this.cartDescLabel = page.getByTestId('cart-desc-label');
    this.paymentInfoLabel = page.getByTestId('payment-info-label');
    this.paymentInfoValue = page.getByTestId('payment-info-value');
    this.shippingInfoLabel = page.getByTestId('shipping-info-label');
    this.shippingInfoValue = page.getByTestId('shipping-info-value');
    this.totalInfoLabel = page.getByTestId('total-info-label');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/checkout-step-two.html');
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectPageElementsVisible() {
    await this.header.expectVisible();
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.cartQuantityLabel).toHaveText('QTY');
    await expect(this.cartDescLabel).toHaveText('Description');
    await expect(this.paymentInfoLabel).toHaveText('Payment Information:');
    await expect(this.paymentInfoValue).toBeVisible();
    await expect(this.shippingInfoLabel).toHaveText('Shipping Information:');
    await expect(this.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
    await expect(this.totalInfoLabel).toHaveText('Price Total');
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
    await expect(this.finishButton).toBeVisible();
    await this.footer.expectVisible();
  }

  itemPrice(name: string): Locator {
    return this.page
      .getByTestId('inventory-item')
      .filter({ has: this.page.getByTestId('inventory-item-name').getByText(name, { exact: true }) })
      .getByTestId('inventory-item-price');
  }

  async expectItemPrice(name: string, price: string) {
    await expect(this.itemPrice(name)).toHaveText(price);
  }
}
