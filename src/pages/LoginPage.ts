import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginCredentials: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.login_logo');
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.loginCredentials = page.getByTestId('login-credentials');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectPageElementsVisible() {
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(this.logo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginCredentials).toBeVisible();
  }

  async expectUnsuccessfulLogin() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  }

  async expectLockedOutErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  }
}
