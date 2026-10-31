import { test } from '@fixtures/pages.fixture';
import { randomProductNames } from '@data/products';
import { randomCustomerInfo } from '@data/customer';

test('should display all page elements', async ({ checkoutPageForRegularUser }) => {
  await checkoutPageForRegularUser.goto();
  await checkoutPageForRegularUser.expectPageElementsVisible();
});

test('should show the cart badge with the number of selected products', async ({
  productPageForRegularUser,
  checkoutPageForRegularUser,
}) => {
  const selectedProducts = randomProductNames(3);

  await productPageForRegularUser.goto();
  await productPageForRegularUser.addToCart(...selectedProducts);

  await checkoutPageForRegularUser.goto();
  await checkoutPageForRegularUser.header.expectCartBadgeCount(selectedProducts.length);
});

test('should show an error when First Name is missing', async ({ checkoutPageForRegularUser }) => {
  const { lastName, postalCode } = randomCustomerInfo();

  await checkoutPageForRegularUser.goto();
  await checkoutPageForRegularUser.fillCustomerInformation('', lastName, postalCode);
  await checkoutPageForRegularUser.continueCheckout();
  await checkoutPageForRegularUser.expectFirstNameRequiredError();
});

test('should show an error when Last Name is missing', async ({ checkoutPageForRegularUser }) => {
  const { firstName, postalCode } = randomCustomerInfo();

  await checkoutPageForRegularUser.goto();
  await checkoutPageForRegularUser.fillCustomerInformation(firstName, '', postalCode);
  await checkoutPageForRegularUser.continueCheckout();
  await checkoutPageForRegularUser.expectLastNameRequiredError();
});

test('should show an error when Postal Code is missing', async ({ checkoutPageForRegularUser }) => {
  const { firstName, lastName } = randomCustomerInfo();

  await checkoutPageForRegularUser.goto();
  await checkoutPageForRegularUser.fillCustomerInformation(firstName, lastName, '');
  await checkoutPageForRegularUser.continueCheckout();
  await checkoutPageForRegularUser.expectPostalCodeRequiredError();
});