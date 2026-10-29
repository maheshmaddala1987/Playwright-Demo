import { test as base, firefox,expect } from '@playwright/test';

export const test = base.extend({
  browser: async ({}, use) => {
    const browser = await firefox.launch();
    await use(browser);
    await browser.close();
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context}, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect };