import { test } from '@fixtures/pages.fixture';

test('should display cart page with no products added to cart', async ({ cartPageForRegularUser }) => {
  await cartPageForRegularUser.goto();
  await cartPageForRegularUser.expectPageElementsVisibleNoProductsAddedToCart();
});