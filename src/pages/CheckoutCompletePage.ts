import { Download, expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { Header } from '@pages/components/Header';
import { CustomerInfo } from '@data/customer';
import { ORDER_COMPLETE_HEADER, RECEIPT_CLOSING_MESSAGE } from '@data/messages';
import { parsePriceCents } from '@utils/price';
import { OrderReceipt } from '@utils/orderReceipt';
import { OverviewTotals } from '@pages/CheckoutOverviewPage';

const ORDER_DATE_TOLERANCE_MS = 2 * 60 * 1000;

export class CheckoutCompletePage {
  readonly page: Page;
  readonly header: Header;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;
  readonly generatePdfButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.generatePdfButton = page.getByTestId('generate-pdf-order');
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/checkout-complete.html');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async downloadPdfReceipt(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.generatePdfButton.click();
    return downloadPromise;
  }

  async expectOrderComplete() {
    await this.header.expectVisible();
    await expect(this.completeHeader).toHaveText(ORDER_COMPLETE_HEADER);
    await expect(this.completeText).toBeVisible();
    await expect(this.backToProductsButton).toBeVisible();
    await this.footer.expectVisible();
  }

  expectPdfDownloaded(download: Download) {
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  }

  expectReceiptOrderDate(receipt: OrderReceipt, placedAt: Date) {
    expect(Math.abs(receipt.orderDate.getTime() - placedAt.getTime())).toBeLessThan(ORDER_DATE_TOLERANCE_MS);
  }

  expectReceiptShipTo(receipt: OrderReceipt, customer: CustomerInfo) {
    expect(receipt.shipToName).toBe(`${customer.firstName} ${customer.lastName}`);
    expect(receipt.shipToPostalCode).toBe(customer.postalCode);
  }

  expectReceiptItems(receipt: OrderReceipt, productPrices: Record<string, string>) {
    expect(receipt.itemPrices).toEqual(productPrices);
  }

  expectReceiptTotals(receipt: OrderReceipt, overviewTotals: OverviewTotals, productPrices: Record<string, string>) {
    const productPricesCents = Object.values(productPrices).reduce((sum, price) => sum + parsePriceCents(price), 0);

    expect(receipt.itemTotalCents).toBe(productPricesCents);
    expect(receipt.itemTotalCents).toBe(overviewTotals.itemTotalCents);
    expect(receipt.taxCents).toBe(overviewTotals.taxCents);
    expect(receipt.totalCents).toBe(overviewTotals.totalCents);
    expect(receipt.totalCents).toBe(receipt.itemTotalCents + receipt.taxCents);
  }

  expectReceiptClosingMessage(receipt: OrderReceipt) {
    expect(receipt.closingMessage).toBe(RECEIPT_CLOSING_MESSAGE);
  }
}
