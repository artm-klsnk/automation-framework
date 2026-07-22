import { test, expect } from '@fixtures/pages.fixture';
import { users } from '@data/users';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('title and all the page elements are present on the page', async ({ loginPage }) => {
  await loginPage.expectPageElementsVisible();
});

test('login with invalid credentials', async ({ loginPage }) => {
  await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
  await loginPage.expectUnsuccessfulLogin();
});

test('login with locked out user', async ({ loginPage }) => {
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await loginPage.expectLockedOutErrorMessage();
});

test('login with valid credentials', async ({ loginPage, page }) => {
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory/);
});
