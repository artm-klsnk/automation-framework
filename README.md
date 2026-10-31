# Swag Labs UI Test Automation

UI test automation framework for [Swag Labs](https://www.saucedemo.com) — a demo e-commerce app — built with Playwright and TypeScript using the Page Object Model.

## Tech stack

- [Playwright Test](https://playwright.dev/) — test runner and browser automation
- TypeScript (`strict` mode)
- Page Object Model + component objects

## What's covered

| Area | Scenarios |
|------|-----------|
| Login | Page elements, valid login, invalid credentials, locked-out user |
| Products | Page elements, adding all products to cart (badge + button state), sorting by name and price |

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
  pages/      Page objects (LoginPage, ProductsPage, ProductCard)
  fixtures/   Playwright fixtures exposing page objects to tests
  data/       Static test data: users, product slugs
tests/        Spec files
```

## Design decisions

- **Assertions live in page objects.** Specs read as a sequence of named steps
  (`login(...)` → `expectLockedOutErrorMessage()`), with no raw `expect` calls for page state.
- **Actions and assertions are separated.** Action methods only perform steps;
  `expect*` methods only verify state.
- **Stable locators.** Elements are located by `data-test` attributes via `getByTestId`, not CSS classes.
- **Component objects for repeated UI.** Each product card is a `ProductCard` built from a slug,
  so locators are generated rather than duplicated.
- **Test data is never inlined.** Credentials and product identifiers come from `src/data`.
- **Fixtures handle setup.** `productPageForRegularUser` logs in before the test, so specs start
  from the state they need.

## Roadmap

- [ ] CI with GitHub Actions
- [ ] Cart and checkout flows
- [ ] Allure reporting
