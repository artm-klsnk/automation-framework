import { test, expect } from '@fixtures/pages.fixture';
import { randomProductNames } from '@data/products';

test.beforeEach(async ({ productPageForRegularUser, checkoutOverviewPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addToCart(...randomProductNames(3));
  await checkoutOverviewPageForRegularUser.goto();
});

test('should display all page elements', async ({ checkoutOverviewPageForRegularUser }) => {
  await checkoutOverviewPageForRegularUser.expectPageElementsVisible();
});

test('should return to the products page when clicking Cancel', async ({
  checkoutOverviewPageForRegularUser,
  page,
}) => {
  await checkoutOverviewPageForRegularUser.cancelCheckout();
  await expect(page).toHaveURL(/inventory\.html$/);
});

test('should complete the order when clicking Finish', async ({ checkoutOverviewPageForRegularUser, page }) => {
  await checkoutOverviewPageForRegularUser.finishCheckout();
  await expect(page).toHaveURL(/checkout-complete\.html$/);
});