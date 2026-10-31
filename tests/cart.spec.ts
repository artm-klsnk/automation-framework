import { test } from '@fixtures/pages.fixture';
import { productNames, randomProductNames } from '@data/products';

test('should display cart page with no products added to cart', async ({ cartPageForRegularUser }) => {
  await cartPageForRegularUser.goto();
  await cartPageForRegularUser.expectPageElementsVisibleNoProductsAddedToCart();
});

for (const product of productNames) {
  test(`should show ${product} in the cart matching the product page description and price`, async ({
    productPageForRegularUser,
    cartPageForRegularUser,
  }) => {
    await productPageForRegularUser.goto();
    const card = productPageForRegularUser.card(product);
    const description = await card.description.innerText();
    const price = await card.price.innerText();
    await productPageForRegularUser.addToCart(product);
    await productPageForRegularUser.header.expectCartBadgeCount(1);

    await cartPageForRegularUser.goto();
    await cartPageForRegularUser.expectItemInCart(product, description, price, 1);
  });
}

test('should remove a single product from a cart of three products', async ({
  productPageForRegularUser,
  cartPageForRegularUser,
}) => {
  const selectedProducts = randomProductNames(3);
  const [toRemove] = selectedProducts;

  await productPageForRegularUser.goto();
  await productPageForRegularUser.addToCart(...selectedProducts);

  await cartPageForRegularUser.goto();
  await cartPageForRegularUser.removeFromCart(toRemove);
  await cartPageForRegularUser.expectItemsNotInCart(toRemove);
  await cartPageForRegularUser.header.expectCartBadgeCount(selectedProducts.length - 1);
});

test('should remove two products from a cart of five products', async ({
  productPageForRegularUser,
  cartPageForRegularUser,
}) => {
  const selectedProducts = randomProductNames(5);
  const toRemove = selectedProducts.slice(0, 2);

  await productPageForRegularUser.goto();
  await productPageForRegularUser.addToCart(...selectedProducts);

  await cartPageForRegularUser.goto();
  await cartPageForRegularUser.removeFromCart(...toRemove);
  await cartPageForRegularUser.expectItemsNotInCart(...toRemove);
  await cartPageForRegularUser.header.expectCartBadgeCount(selectedProducts.length - toRemove.length);
});

test('should remove all products from the cart', async ({ productPageForRegularUser, cartPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();

  await cartPageForRegularUser.goto();
  await cartPageForRegularUser.removeAllProductsFromCart();
  await cartPageForRegularUser.expectPageElementsVisibleNoProductsAddedToCart();
  await cartPageForRegularUser.header.expectCartBadgeCount(0);
});