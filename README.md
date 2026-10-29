# Playwright Demo

This repository is a Playwright-based test automation demo focused on browser interactions, page object modeling, data-driven testing, and multi-environment configuration.

It includes examples for common UI automation patterns such as:

- Login and authentication flows
- Dropdown and alert handling
- Tabs and windows
- File upload and download flows
- Data-driven tests using JSON, CSV, and Excel
- API testing examples
- Page Object Model (POM) structure
- Environment-specific configuration with `.env` files

## Tech Stack

- TypeScript
- Playwright
- Node.js
- dotenv
- Faker
- CSV / Excel parsing utilities

## Project Structure

```text
.
├── .github/
├── download/
├── env-files/
├── fixtures/
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── LoginPage.ts
├── test-data/
├── tests/
│   ├── API/
│   ├── Alerts.spec.ts
│   ├── BootstrapDropdown.spec.ts
│   ├── DataDriven-csv.spec.ts
│   ├── DataDriven-excel.spec.ts
│   ├── DataDriven-json.spec.ts
│   ├── GETTest.spec.ts
│   ├── Locators.spec.ts
│   ├── MultipleEnvironments.spec.ts
│   ├── POMTest.spec.ts
│   ├── upload.spec.ts
│   └── ...
├── upload/
├── utils/
├── .gitignore
├── package.json
├── playwright.config.ts
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm
- A browser supported by Playwright (Chromium is configured by default)

### Install dependencies

```bash
npm install
```

### Run tests

The project includes environment-specific scripts for development and QA.

```bash
npm run test:dev
npm run test:qa
```

You can also run Playwright directly for a specific test file:

```bash
npx playwright test tests/POMTest.spec.ts
```

## Configuration

The Playwright configuration is defined in `playwright.config.ts` and loads environment variables from the `env-files` directory.

Example environment setup:

```text
env-files/
├── .env.dev
├── .env.qa
└── ...
```

This allows the suite to run against different environments without changing the test logic.

## Useful Notes

- Uses a `Desktop Chrome` project configuration by default.
- Supports HTML reporting and CI-friendly execution patterns.
- Includes examples for page-object-based tests and fixture reuse patterns.

## License

This project is licensed under the ISC license.

## Author

This repository appears to be a learning/demo project for Playwright automation and test engineering practices.
