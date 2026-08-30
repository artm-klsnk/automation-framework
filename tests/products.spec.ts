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

test('should sort products correctly by name and price', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();

  await productPageForRegularUser.selectSortOption('az');
  await productPageForRegularUser.expectItemsSortedByNameAscending();

  await productPageForRegularUser.selectSortOption('za');
  await productPageForRegularUser.expectItemsSortedByNameDescending();

  await productPageForRegularUser.selectSortOption('lohi');
  await productPageForRegularUser.expectItemsSortedByPriceAscending();

  await productPageForRegularUser.selectSortOption('hilo');
  await productPageForRegularUser.expectItemsSortedByPriceDescending();
});