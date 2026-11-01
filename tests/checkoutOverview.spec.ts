import { test, expect } from '@fixtures/pages.fixture';
import { productNames } from '@data/products';

test('should display all page elements', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  await checkoutOverviewPageForRegularUser.expectPageElementsVisible();
});

test('should display the correct price next to each product', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  const productPrices: Record<string, string> = Object.fromEntries(
    await Promise.all(
      productNames.map(async (product): Promise<[string, string]> => {
        const card = productPageForRegularUser.card(product);
        return [await card.name.innerText(), await card.price.innerText()];
      })
    )
  );
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  for (const [name, price] of Object.entries(productPrices)) {
    await checkoutOverviewPageForRegularUser.expectItemPrice(name, price);
  }
});

test('should display totals where the item total matches the sum of item prices and the total matches item total plus tax', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  await checkoutOverviewPageForRegularUser.expectTotalsCorrect();
});

test('should return to the products page when clicking Cancel', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
  page,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  await checkoutOverviewPageForRegularUser.cancelCheckout();
  await expect(page).toHaveURL(/inventory\.html$/);
});