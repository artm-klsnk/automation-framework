# Swag Labs UI Test Automation

UI test automation framework for [Swag Labs](https://www.saucedemo.com) — a demo e-commerce app — built with Playwright and TypeScript using the Page Object Model.

## Tech stack

- [Playwright Test](https://playwright.dev/) — test runner and browser automation
- TypeScript (`strict` mode)
- Page Object Model + component objects

## What's covered

| Area     | Scenarios                                                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login    | Page elements, valid login, invalid credentials, locked-out user                                                                                   |
| Products | Page elements, adding all products to cart (badge + button state), sorting by name and price                                                      |
| Cart     | Empty-cart state, added product matches the product page (description, price, quantity, remove button) — looped over every product, removing one/several/all products (card removal + badge count), clicking a product title opens that product's detail page |
| Checkout (step one) | Page elements, cart badge reflects the number of selected products, required-field validation errors (First Name, Last Name, Postal Code) |

## Getting started

Requires Node.js 20+.

```bash
git clone https://github.com/artm-klsnk/automation-framework.git
cd automation-framework
npm ci
npx playwright install --with-deps chromium
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project structure

```
src/
  pages/
    LoginPage.ts
    ProductsPage.ts   # includes ProductCard
    CartPage.ts       # includes CartItem
    CheckoutPage.ts   # checkout step one: customer information form
    ProductDetailPage.ts # single-product detail page opened from a cart item title
    components/       # Header, Footer — shared chrome reused across pages
  fixtures/           # Playwright fixtures exposing page objects to tests
  data/                # Static test data: users, products (slugs, Product type, name list, random selectors), customer (random valid checkout info)
tests/                 # Spec files
```

## Design decisions

- **Assertions live in page objects.** Specs read as a sequence of named steps
  (`login(...)` → `expectLockedOutErrorMessage()`), with no raw `expect` calls for page state.
- **Actions and assertions are separated.** Action methods only perform steps;
  `expect*` methods only verify state.
- **Stable locators.** Elements are located by `data-test` attributes via `getByTestId`, not CSS classes, where possible.
- **Component objects for repeated UI.** A product card (`ProductCard`) or cart line (`CartItem`) is
  built from a product slug, so locators are generated rather than duplicated. Chrome shared by every
  page — menu, logo, title, cart badge (`Header`) and the social/footer links (`Footer`) — is its own
  component, composed into each page object instead of redeclared per page.
- **Test data is never inlined.** Credentials and product identifiers come from `src/data`.
- **Fixtures handle setup.** `productPageForRegularUser` and `cartPageForRegularUser` share a single
  login via a `regularUserSession` fixture, so specs start from the state they need without logging in twice.

## Roadmap

- [x] Cart flows (view, add, remove)
- [ ] Checkout flow
- [ ] CI with GitHub Actions
- [ ] Allure reporting
