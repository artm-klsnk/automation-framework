import { test, expect } from '@fixtures/pages.fixture';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Swag Labs/);
});

test('all the page elements are present on the page', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.expectPageElementsVisible();
});

test('login with valid credentials', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('login with invalid credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'invalid_password');
  await loginPage.expectUnsuccessfulLogin();
});