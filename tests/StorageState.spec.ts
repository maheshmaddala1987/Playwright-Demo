import { test, expect } from '@playwright/test';

// makes execution serial
test.describe.configure({mode:'serial'})

test('should display user dashboard', async ({ browser }) => {

    // attaching the local storage
const context = await browser.newContext( {storageState:'playwright/.auth/user.json'});

const page=await context.newPage();

await page.goto('https://www.saucedemo.com/inventory.html');

await expect(page.getByText('Products', { exact: true })).toBeVisible();

await page.getByRole('button', { name: 'Open Menu' }).click();
await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});