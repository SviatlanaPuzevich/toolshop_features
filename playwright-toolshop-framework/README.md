# Tool Shop test automation framework

UI tests for [practicesoftwaretesting.com](https://practicesoftwaretesting.com/), written with
Playwright and TypeScript.

## Layers

The framework is split into three layers. A layer may only use the layers below it, never
the other way round.

```
tests/       specs, fixtures, test data and the framework configuration
   |
business/    everything that knows the tested shop: pages, components, flows, models
   |
core/        reusable automation building blocks, no knowledge of the shop
```

### `core/` - core layer

Project independent building blocks. Nothing here mentions the shop, its URLs or its markup,
so the whole folder can be reused by another project as it is.

| Item                                    | Responsibility                                                      |
| --------------------------------------- | ------------------------------------------------------------------- |
| `ui/BasePage`, `ui/NavigablePage`       | roots of the page object hierarchy; a navigable page has an own URL |
| `ui/BaseComponent`                      | root of the component hierarchy, scoped to its own root locator     |
| `ui/ApiResponseWaiter`, `ui/RequestSpy` | synchronising steps with back end calls and recording them          |
| `ui/UrlMatcher`                         | one way of describing an URL for both of them                       |
| `config/EnvironmentVariables`           | typed, fail fast reading of environment variables                   |
| `utils/*`                               | dates, random test data, string helpers                             |

### `business/` - business layer

Everything that encodes knowledge about the shop.

- `pages/` - page objects (`CatalogPage`, `ProductPage`, `RegisterPage`, `LoginPage`,
  `CartPage`, `CheckoutPage`). A page exposes _what a customer can do_, not how it is clicked.
- `components/` - parts of a page that are reused across pages (`LoginForm` is rendered both
  on the login page and in the checkout, `SearchPanel` and `CategoryFilterPanel` live in the
  catalog side bar).
- `flows/` - scenarios that span several pages (`CheckoutFlow`, `UserRegistrationFlow`), so the
  preconditions of a test are described once in the business layer instead of in every spec.
- `models/` - `User`, `RegistrationData`, `GuestContact` and the names of the registration fields.
- `data/` - factories that build valid data and let a test override only the interesting value.
- `constants/`, `support/` - routes, back end endpoints and the shop specific selector quirks.

### `tests/` - tests layer

- `specs/` - the tests themselves. They only arrange data, call the business layer and assert.
- `fixtures/` - Playwright fixtures, layered on top of each other:
  `pages.fixture` (page objects) -> `flows.fixture` (business flows) -> `preconditions.fixture`
  (a registered customer, a request spy). `fixtures/index.ts` is the only import a spec needs.
- `data/` - parameters of the data driven tests.
- `config/testConfig.ts` - all settings with their defaults, read from environment variables and
  consumed by `playwright.config.ts`.

## Running

```bash
npm install
npx playwright install     # once, to download the browsers

npm test                   # all browsers
npm run test:headed
npm run test:ui
npm run report             # opens the HTML report of the last run

npm run typecheck
npm run lint
npm run format
```

### Settings

| Variable         | Default                                | Meaning                        |
| ---------------- | -------------------------------------- | ------------------------------ |
| `BASE_URL`       | `https://practicesoftwaretesting.com/` | address of the shop under test |
| `TEST_RETRIES`   | `2`                                    | retries of a failed test       |
| `TEST_WORKERS`   | `2`                                    | tests running in parallel      |
| `HEADLESS`       | `true`                                 | run the browsers headless      |
| `TEST_TIMEOUT`   | `60000`                                | timeout of a test, in ms       |
| `EXPECT_TIMEOUT` | `10000`                                | timeout of an assertion, in ms |

```bash
BASE_URL=https://staging.example.com HEADLESS=false npm test
```
