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

## Dependencies

This project uses the following dependencies and dev dependencies:

```bash
npm install
```

```json
{
  "devDependencies": {
    "@faker-js/faker": "^9.9.0",
    "@playwright/test": "^1.64.1",
    "@types/node": "^26.6.5",
    "cross-env": "^10.1.0",
    "dotenv": "^18.0.9"
  },
  "dependencies": {
    "@types/luxon": "^3.7.6",
    "ajv": "^8.20.0",
    "csv-parse": "^7.0.3",
    "luxon": "^3.7.2",
    "xlsx": "^0.18.5"
  }
}
```

### Dependency overview

- `@playwright/test` – Playwright testing framework
- `dotenv` – Load environment variables from `.env` files
- `cross-env` – Set environment variables across OS platforms
- `csv-parse` – Read CSV files for data-driven test inputs
- `xlsx` – Read Excel workbook data
- `ajv` – JSON schema validation support
- `luxon` and `@types/luxon` – Date/time utilities
- `@faker-js/faker` – Generate fake test data

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
├── README.md
```

## Example Snippets

### 1) Page Object Model (POM)

Base page and login page example:

```ts
// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElementToBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
```

```ts
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }
}
```

### 2) Playwright Fixture Example

```ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

interface LoginData {
  loginPage: LoginPage;
  homePage: HomePage;
}

export const test = base.extend<LoginData>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ loginPage, page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
```

This pattern allows page objects to be reused across tests and promotes cleaner setup.

### 3) Read Test Data from CSV

```ts
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export function readCsvData<T>(relativeFilePath: string): T[] {
  const absolutePath = path.resolve(process.cwd(), relativeFilePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`CSV file not found at path: ${absolutePath}`);
  }

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as T[];
}
```

Example usage:

```ts
import { readCsvData } from '../utils/csvReader';

const users = readCsvData<{ username: string; password: string }>('test-data/loginData.csv');

for (const user of users) {
  console.log(user.username, user.password);
}
```

### 4) Read Test Data from JSON

```ts
import * as fs from 'fs';
import * as path from 'path';

export function readJsonArray<T>(relativeFilePath: string): T[] {
  try {
    const absolutePath = path.resolve(process.cwd(), relativeFilePath);
    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      throw new Error(`Data in ${relativeFilePath} is not a valid JSON array.`);
    }

    return parsedData as T[];
  } catch (error) {
    console.error(`Failed to read JSON array from ${relativeFilePath}:`, error);
    throw error;
  }
}
```

Example usage:

```ts
import { readJsonArray } from '../utils/jsonReader';

const users = readJsonArray<{ name: string; email: string }>('test-data/users.json');
console.log(users[0]);
```

### 5) Read Test Data from Excel

```ts
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export function readExcelData<T>(filePath: string, sheetName?: string): T[] {
  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Excel file not found at: ${absolutePath}`);
  }

  const workbook = xlsx.readFile(absolutePath);
  const targetSheetName = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheetName];

  if (!worksheet) {
    throw new Error(`Sheet named "${targetSheetName}" was not found in the workbook.`);
  }

  return xlsx.utils.sheet_to_json(worksheet) as T[];
}
```

Example usage:

```ts
import { readExcelData } from '../utils/excelReader';

const users = readExcelData<{ username: string; password: string }>('test-data/test-users.xlsx');
console.log(users[0]);
```

## Playwright API Test Example

```ts
import { test, expect, APIRequestContext } from '@playwright/test';

const apiBaseUrl = 'https://fakestoreapi.com';

const authHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer fake-store-demo-token',
};

const jsonObjectPayload = {
  id: 'user-001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

const jsonFilePayload = JSON.stringify({
  id: 'user-002',
  name: 'John Smith',
  email: 'john.smith@example.com',
});

const patchPayload = {
  name: 'Jane Updated',
  email: 'jane.updated@example.com',
};

const jsonSchema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
};

const validateJsonSchema = (value: unknown, schema: any): boolean => {
  if (!schema || typeof schema !== 'object') {
    return true;
  }

  if (schema.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return false;
    }

    for (const key of schema.required ?? []) {
      if (!(key in (value as Record<string, unknown>))) {
        return false;
      }
    }

    for (const [key, definition] of Object.entries(schema.properties ?? {})) {
      if ((value as Record<string, unknown>)[key] !== undefined) {
        if (!validateJsonSchema((value as Record<string, unknown>)[key], definition)) {
          return false;
        }
      }
    }

    return true;
  }

  if (schema.type === 'array') {
    return Array.isArray(value);
  }

  if (schema.type === 'string') {
    return typeof value === 'string';
  }

  if (schema.type === 'number') {
    return typeof value === 'number';
  }

  if (schema.type === 'boolean') {
    return typeof value === 'boolean';
  }

  if (schema.type === 'null') {
    return value === null;
  }

  return true;
};

const captureNetwork = async (
  request: APIRequestContext,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  payload?: any,
) => {
  let response;
  const requestMeta = {
    method,
    url,
    headers: authHeaders,
    payload,
  };

  switch (method) {
    case 'GET':
      response = await request.get(url, { headers: authHeaders });
      break;
    case 'POST':
      response = await request.post(url, { headers: authHeaders, data: payload });
      break;
    case 'PUT':
      response = await request.put(url, { headers: authHeaders, data: payload });
      break;
    case 'PATCH':
      response = await request.patch(url, { headers: authHeaders, data: payload });
      break;
    case 'DELETE':
      response = await request.delete(url, { headers: authHeaders });
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  const body = await response.json();
  const responseMeta = {
    status: response.status(),
    headers: response.headers(),
    body,
  };

  return { response, body, requestMeta, responseMeta };
};

test.describe('FakeStore API - CRUD + schema + network capture', () => {
  test('GET /users/1 should return valid JSON and schema', async ({ request }) => {
    const url = `${apiBaseUrl}/users/1`;
    const { response, body } = await captureNetwork(request, 'GET', url);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');

    expect(validateJsonSchema(body, jsonSchema)).toBeTruthy();
    expect.soft(body.name).toBe(body.name);
    expect.soft(body.email).toBe(body.email);
  });

  test('POST /users with JsonObject payload should create a user and validate schema', async ({ request }) => {
    const url = `${apiBaseUrl}/users`;
    const { response, body, requestMeta, responseMeta } = await captureNetwork(
      request,
      'POST',
      url,
      jsonObjectPayload,
    );

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');

    expect(validateJsonSchema(body, jsonSchema)).toBeTruthy();

    expect.soft(body.name).toBe(jsonObjectPayload.name);
    expect.soft(body.email).toBe(jsonObjectPayload.email);

    expect(requestMeta.method).toBe('POST');
    expect(responseMeta.status).toBe(200);
    expect(responseMeta.body).toEqual(body);
  });

  test('PUT /users/1 with JsonFile payload should update a user and validate schema', async ({ request }) => {
    const url = `${apiBaseUrl}/users/1`;
    const { response, body, requestMeta, responseMeta } = await captureNetwork(
      request,
      'PUT',
      url,
      jsonFilePayload,
    );

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');

    expect(validateJsonSchema(body, jsonSchema)).toBeTruthy();

    const jsonFileObject = JSON.parse(jsonFilePayload);

    expect.soft(body.name).toBe(jsonFileObject.name);
    expect.soft(body.email).toBe(jsonFileObject.email);

    expect(requestMeta.method).toBe('PUT');
    expect(responseMeta.status).toBe(200);
    expect(responseMeta.body).toEqual(body);
  });

  test('PATCH /users/1 should partially update a user and validate schema', async ({ request }) => {
    const url = `${apiBaseUrl}/users/1`;
    const { response, body } = await captureNetwork(request, 'PATCH', url, patchPayload);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');

    expect(validateJsonSchema(body, jsonSchema)).toBeTruthy();

    expect.soft(body.name).toBe(patchPayload.name);
    expect.soft(body.email).toBe(patchPayload.email);
  });

  test('DELETE /users/1 should remove the user and validate schema', async ({ request }) => {
    const url = `${apiBaseUrl}/users/1`;
    const { response, body, requestMeta, responseMeta } = await captureNetwork(
      request,
      'DELETE',
      url,
    );

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('string');

    expect(validateJsonSchema(body, jsonSchema)).toBeTruthy();

    expect(requestMeta.method).toBe('DELETE');
    expect(responseMeta.status).toBe(200);
  });
});
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
