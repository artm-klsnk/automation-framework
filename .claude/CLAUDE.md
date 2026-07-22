# automation-framework

Playwright + TypeScript UI test suite for [saucedemo.com](https://www.saucedemo.com), using the Page Object Model.

## Stack

- Playwright Test (`@playwright/test`), TypeScript, `strict: true`
- Path aliases: `@pages/*` → `src/pages/*`, `@fixtures/*` → `src/fixtures/*`, `@data/*` → `src/data/*`
- `testIdAttribute` is `data-test` (use `page.getByTestId(...)`, not raw CSS selectors, for test-id-tagged elements)

## Structure

- `src/pages/` — Page Object classes (one per page, e.g. `LoginPage.ts`)
- `src/fixtures/` — Playwright fixtures that instantiate and expose page objects to tests
- `src/data/` — static test data (e.g. `users.ts`), exported as `as const satisfies Record<string, T>` objects, never inlined as string literals in specs
- `tests/` — spec files, import `test`/`expect` from `@fixtures/pages.fixture`, never directly from `@playwright/test`

## Page Object conventions

- Locators are declared as `readonly` fields, initialized in the constructor.
- Action methods (`goto`, `login`, ...) perform steps only — no assertions inside them.
- Assertion methods are named `expect<Something>` (e.g. `expectPageElementsVisible`, `expectUnsuccessfulLogin`, `expectLockedOutErrorMessage`) and contain the `expect(...)` calls internally. They return `void`, not booleans.
- Add one `expect<Something>` method per distinct outcome/state rather than a generic parameterized checker — mirrors how a human reads the test as a sequence of named steps.

## Test conventions

- Navigation shared by every test in a file (`loginPage.goto()`) belongs in `test.beforeEach`, not repeated per test. Each `test(...)` body reads as: action (`login(...)`) → one `expect<Something>()` call.
- No inline `expect(...)` assertions in spec files for page state/outcomes — assertions live in the page object. Exceptions: assertions that check something the page object doesn't own (e.g. `expect(page).toHaveURL(...)` after a navigation-triggering action) can stay inline.
- Use fixtures (`loginPage`, etc.) from `@fixtures/pages.fixture`; don't construct page objects manually in tests.
- Credentials and other reusable test inputs come from `src/data/*` (e.g. `users.standard.username`), never as string literals in a test.

## Commands

```bash
npx playwright test              # run all tests
npx playwright test -g "<name>"  # run a single test by title
npx playwright show-report       # view the HTML report
```
