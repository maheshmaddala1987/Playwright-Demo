import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';

const authFile = 'playwright/.auth/userr.json';

setup('authenticate and save session storage', async ({ page }) => {
  // 1. Perform login steps
  await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

await page.getByRole('button', { name: 'Login' }).click({force:true});
  
  // Wait for navigation to complete
 const loginSuccess = await page.getByText('Products').textContent();
 expect(loginSuccess).toEqual('Products');

  // 2. Extract Session Storage items
  const sessionStorageData = await page.evaluate(() => JSON.stringify(sessionStorage));

  // 3. Get the standard storage state (cookies + local storage)
  const storageState = await page.context().storageState();

  // 4. Combine them into a single file or write a separate file
  const completeState = {
    ...storageState,
    sessionStorage: JSON.parse(sessionStorageData)
  };

  fs.writeFileSync(authFile, JSON.stringify(completeState, null, 2));
});
