import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutInformationPage } from '@pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '@pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '@pages/CheckoutCompletePage';
import { ProductDetailPage } from '@pages/ProductDetailPage';
import { users } from '@data/users';

type Pages = {
  loginPage: LoginPage;
  regularUserSession: void;
  productPageForRegularUser: ProductsPage;
  cartPageForRegularUser: CartPage;
  checkoutInformationPageForRegularUser: CheckoutInformationPage;
  checkoutOverviewPageForRegularUser: CheckoutOverviewPage;
  checkoutCompletePageForRegularUser: CheckoutCompletePage;
  productDetailPageForRegularUser: ProductDetailPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  regularUserSession: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await use();
  },
  productPageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new ProductsPage(page));
  },
  cartPageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new CartPage(page));
  },
  checkoutInformationPageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutOverviewPageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  productDetailPageForRegularUser: async ({ page, regularUserSession }, use) => {
    await use(new ProductDetailPage(page));
  },
});

export { expect } from '@playwright/test';
