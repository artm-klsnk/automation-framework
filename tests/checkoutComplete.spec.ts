import { test } from '@fixtures/pages.fixture';

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

test('should download a PDF when clicking Generate PDF File', async ({
  productPageForRegularUser,
  checkoutOverviewPageForRegularUser,
  checkoutCompletePageForRegularUser,
}) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.addAllProductsToCart();
  await checkoutOverviewPageForRegularUser.goto();

  await checkoutOverviewPageForRegularUser.finishCheckout();
  await checkoutCompletePageForRegularUser.generatePfdFile();
  checkoutCompletePageForRegularUser.expectPdfDownloaded();
});