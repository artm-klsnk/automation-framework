import { test } from '@fixtures/pages.fixture';

test('should display products page', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.expectPageElementsVisible();
});

test('should update cart badge count and button labels when all products are added to cart', async ({
  productPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await productPageForRegularUser.expectCartBadgeCount(6);
  await productPageForRegularUser.expectAllAddToCartButtonsChangedToRemove();
});