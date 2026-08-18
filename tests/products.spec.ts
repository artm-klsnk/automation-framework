import { test } from '@fixtures/pages.fixture';

test('should display products page', async ({ productPageForRegularUser }) => {
  await productPageForRegularUser.goto();
  await productPageForRegularUser.expectPageElementsVisible();
});