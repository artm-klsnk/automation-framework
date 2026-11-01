import { test, expect } from '@fixtures/pages.fixture';
import { productNames } from '@data/products';

let productPrices: Record<string, string>;

test.beforeEach(async ({ productPageForRegularUser, checkoutOverviewPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  productPrices = Object.fromEntries(
    await Promise.all(
      productNames.map(async (product) => {
        const card = productPageForRegularUser.card(product);
        return [await card.name.innerText(), await card.price.innerText()];
      })
    )
  );
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();
});

test('should display all page elements', async ({ checkoutOverviewPageForRegularUser }) => {
  await checkoutOverviewPageForRegularUser.expectPageElementsVisible();
});

test('should display the correct price next to each product', async ({ checkoutOverviewPageForRegularUser }) => {
  for (const [name, price] of Object.entries(productPrices)) {
    await checkoutOverviewPageForRegularUser.expectItemPrice(name, price);
  }
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