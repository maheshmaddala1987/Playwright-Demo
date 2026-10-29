import { test, expect } from '@playwright/test';

test('Interact with Session Storage', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Set an item in session storage
  await page.evaluate(() => {
    sessionStorage.setItem('theme', 'dark');
    sessionStorage.setItem('cartCount', '3');
  });

  // Retrieve and verify an item
  const theme = await page.evaluate(() => sessionStorage.getItem('theme'));
  expect(theme).toBe('dark');

  // Alternative using Playwright's native Storage API (v1.61+)
  // await page.sessionStorage().setItem('theme', 'dark');
  // const cartCount = await page.sessionStorage().getItem('cartCount');

  await page.evaluate(() => sessionStorage.clear());
});
