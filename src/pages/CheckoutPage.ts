import { expect, Locator, Page } from '@playwright/test';
import { Footer } from '@pages/components/Footer';
import { Header } from '@pages/components/Header';

export class CheckoutPage {
  readonly page: Page;
  readonly header: Header;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async expectPageElementsVisible() {
    await this.header.expectVisible();
    await expect(this.title).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await this.footer.expectVisible();
  }

  async expectFirstNameRequiredError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Error: First Name is required');
  }

  async expectLastNameRequiredError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Error: Last Name is required');
  }

  async expectPostalCodeRequiredError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Error: Postal Code is required');
  }
}