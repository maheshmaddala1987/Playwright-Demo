// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

// Define where the session storage state will be saved
export const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Navigate to the login page
 await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

await page.getByRole('button', { name: 'Login' }).click({force:true});


  // 4. Save storage state into a JSON file
  await page.context().storageState({ path: authFile });
});
