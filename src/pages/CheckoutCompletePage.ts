import { Download, expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { Header } from '@pages/components/Header';
import { extractText, getDocumentProxy } from 'unpdf';
import fs from 'fs';
import { CustomerInfo } from '@data/customer';

const ORDER_DATE_TOLERANCE_MS = 2 * 60 * 1000;

class CheckoutCompletePage {
  readonly page: Page;
  readonly header: Header;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;
  readonly generatePdfFile: Locator;
  readonly footer: Footer;
  lastDownload: Download | null = null;
  lastDownloadRequestedAt: Date | null = null;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.generatePdfFile = page.getByTestId("generate-pdf-order");
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/checkout-complete.html');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async generatePfdFile() {
    this.lastDownloadRequestedAt = new Date();
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.generatePdfFile.click(),
    ]);
    this.lastDownload = download;
  }

  async expectOrderComplete() {
    await this.header.expectVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.backToProductsButton).toBeVisible();
    await this.footer.expectVisible();
  }

  expectPdfDownloaded() {
    expect(this.lastDownload).not.toBeNull();
    expect(this.lastDownload!.suggestedFilename()).toMatch(/\.pdf$/);
  }

  async expectPdfContainsOrderReceipt(customer: CustomerInfo, productPrices: Record<string, string>) {
    const filePath = await this.lastDownload!.path();
    const buffer = fs.readFileSync(filePath!);
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    const lines = text.split('\n').map((line) => line.trim());

    expect(text).toContain('Order Receipt');

    const orderDateText = lines.find((line) => line.startsWith('Order Date '))!.replace('Order Date ', '');
    const orderDate = new Date(orderDateText.replace(' at ', ', '));
    expect(Math.abs(orderDate.getTime() - this.lastDownloadRequestedAt!.getTime())).toBeLessThan(
      ORDER_DATE_TOLERANCE_MS
    );

    const shipToIndex = lines.indexOf('S H I P TO');
    expect(lines[shipToIndex + 1]).toBe(`${customer.firstName} ${customer.lastName}`);
    expect(lines[shipToIndex + 2]).toBe(customer.postalCode);

    for (const [name, price] of Object.entries(productPrices)) {
      expect(lines).toContain(`${name} ${price}`);
    }

    const itemTotalCents = this.parsePriceCents(lines.find((line) => line.startsWith('Item total'))!);
    const taxCents = this.parsePriceCents(lines.find((line) => line.startsWith('Tax'))!);
    const totalCents = this.parsePriceCents(lines.find((line) => line.startsWith('Total'))!);
    expect(totalCents).toBe(itemTotalCents + taxCents);

    expect(text).toContain(
      'Thank you for your order! It has been dispatched, and will arrive just as fast as the pony can get there.'
    );
  }

  private parsePriceCents(text: string): number {
    const [, price] = text.match(/\$(\d+\.\d{2})/)!;
    return Math.round(parseFloat(price) * 100);
  }
}

export default CheckoutCompletePage