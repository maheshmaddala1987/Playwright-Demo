// fixtures/my-fixtures.ts
import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// 1. Define the type for your custom fixtures
type MyFixtures = {
  authenticatedPage: Page;
  //dashboardSetup: string;
};

// 2. Extend the base test object
export const test = base.extend<MyFixtures>({
  
  // Example 1: A "Hook" fixture that handles setup & teardown (returns nothing)
authenticatedPage: async ({page }, use) => {
    // === Setup Code (Runs before each test) ===
await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

await page.getByRole('button', { name: 'Login' }).click({force:true});

//const loginSuccess = await page.getByText('Products').textContent();
//expect(loginSuccess).toEqual('Products');

// Pass control to the test
await use(page);
   
// === Teardown Code (Runs after each test) ===
await page.getByRole('button',{name:'Open Menu'}).click();
await page.getByRole('button', { name: 'Logout' }).click();
await page.close();

},

  // Example 2: A fixture that performs an action AND returns a value to the test
  /*dashboardSetup: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');
    const userRole = await page.textContent('.user-role') || 'Guest';

    // Pass the value to the test
    await use(userRole);

    // Teardown logic if needed
    console.log('Cleaning up dashboard state...');
  }*/

});

// Export expect from the base so you don't have to import it from @playwright/test everywhere
export { expect } from '@playwright/test';
