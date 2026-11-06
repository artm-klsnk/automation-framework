import { test } from '@fixtures/pages.fixture';
import { productNames } from '@data/products';
import { randomCustomerInfo } from '@data/customer';

test('should complete the order when clicking Finish', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
  checkoutCompletePageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  await checkoutOverviewPageForRegularUser.finishCheckout();
  await checkoutCompletePageForRegularUser.expectOrderComplete();
});

test('should download a PDF receipt matching the order when clicking Generate PDF File', async ({
  productPageForRegularUser,
  checkoutInformationPageForRegularUser,
  checkoutOverviewPageForRegularUser,
  checkoutCompletePageForRegularUser,
}) => {
  const customer = randomCustomerInfo();

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

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.fillCustomerInformation(customer);
  await checkoutInformationPageForRegularUser.continueCheckout();

  await checkoutOverviewPageForRegularUser.finishCheckout();
  await checkoutCompletePageForRegularUser.generatePfdFile();
  checkoutCompletePageForRegularUser.expectPdfDownloaded();
  await checkoutCompletePageForRegularUser.expectPdfContainsOrderReceipt(customer, productPrices);
});