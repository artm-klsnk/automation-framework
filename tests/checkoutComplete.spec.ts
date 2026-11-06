import { test } from '@fixtures/pages.fixture';
import { randomCustomerInfo } from '@data/customer';
import { readPdfLines } from '@utils/pdf';
import { parseOrderReceipt } from '@utils/orderReceipt';

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
  const productPrices = await productPageForRegularUser.getProductPrices();
  await productPageForRegularUser.addAllProductsToCart();

  await checkoutInformationPageForRegularUser.goto();
  await checkoutInformationPageForRegularUser.fillCustomerInformation(customer);
  await checkoutInformationPageForRegularUser.continueCheckout();

  const overviewTotals = await checkoutOverviewPageForRegularUser.getTotals();
  const placedAt = new Date();
  await checkoutOverviewPageForRegularUser.finishCheckout();

  const download = await checkoutCompletePageForRegularUser.downloadPdfReceipt();
  checkoutCompletePageForRegularUser.expectPdfDownloaded(download);

  const receipt = parseOrderReceipt(await readPdfLines(download));
  checkoutCompletePageForRegularUser.expectReceiptOrderDate(receipt, placedAt);
  checkoutCompletePageForRegularUser.expectReceiptShipTo(receipt, customer);
  checkoutCompletePageForRegularUser.expectReceiptItems(receipt, productPrices);
  checkoutCompletePageForRegularUser.expectReceiptTotals(receipt, overviewTotals, productPrices);
  checkoutCompletePageForRegularUser.expectReceiptClosingMessage(receipt);
});
