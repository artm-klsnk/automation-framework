import { test } from '@fixtures/pages.fixture';
import { randomProductNames } from '@data/products';
import { randomCustomerInfo } from '@data/customer';

test('should display all page elements', async ({ checkoutInformationPageForRegularUser }) => {
  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.expectPageElementsVisible();
});

test('should show the cart badge with the number of selected products', async ({
  productPageForRegularUser,
  checkoutInformationPageForRegularUser,
}) => {
  const selectedProducts = randomProductNames(3);

  await productPageForRegularUser.goto();
  await productPageForRegularUser.addToCart(...selectedProducts);

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.header.expectCartBadgeCount(selectedProducts.length);
});

test('should show an error when First Name is missing', async ({ checkoutInformationPageForRegularUser }) => {
  const { lastName, postalCode } = randomCustomerInfo();

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.fillCustomerInformation({ firstName: '', lastName, postalCode });
  await checkoutInformationPageForRegularUser.continueCheckout();
  await checkoutInformationPageForRegularUser.expectFirstNameRequiredError();
});

test('should show an error when Last Name is missing', async ({ checkoutInformationPageForRegularUser }) => {
  const { firstName, postalCode } = randomCustomerInfo();

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.fillCustomerInformation({ firstName, lastName: '', postalCode });
  await checkoutInformationPageForRegularUser.continueCheckout();
  await checkoutInformationPageForRegularUser.expectLastNameRequiredError();
});

test('should show an error when Postal Code is missing', async ({ checkoutInformationPageForRegularUser }) => {
  const { firstName, lastName } = randomCustomerInfo();

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.fillCustomerInformation({ firstName, lastName, postalCode: '' });
  await checkoutInformationPageForRegularUser.continueCheckout();
  await checkoutInformationPageForRegularUser.expectPostalCodeRequiredError();
});