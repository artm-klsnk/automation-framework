import { test } from '@fixtures/pages.fixture';
import { productNames } from '@data/products';

test('should display products page', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.expectPageElementsVisible();
});

test('should update cart badge count and button labels when all products are added to cart', async ({
  productPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await productPageForRegularUser.header.expectCartBadgeCount(Object.keys(productPageForRegularUser.cards).length);
  await productPageForRegularUser.expectAllAddToCartButtonsChangedToRemove();
});

test('should sort products by name ascending', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.selectSortOption('az');
  await productPageForRegularUser.expectItemsSortedByNameAscending();
});

test('should sort products by name descending', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.selectSortOption('za');
  await productPageForRegularUser.expectItemsSortedByNameDescending();
});

test('should sort products by price ascending', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.selectSortOption('lohi');
  await productPageForRegularUser.expectItemsSortedByPriceAscending();
});

test('should sort products by price descending', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.selectSortOption('hilo');
  await productPageForRegularUser.expectItemsSortedByPriceDescending();
});

test('should open the specific product page when clicking a product title in the products list', async ({
  productPageForRegularUser,
  productDetailPageForRegularUser,
}) => {
  await productPageForRegularUser.goto();

  for (const product of productNames) {
    const card = productPageForRegularUser.card(product);
    const name = await card.name.innerText();

    await card.open();
    await productDetailPageForRegularUser.expectShowsProduct(name);
    await productPageForRegularUser.goto();
  }
});