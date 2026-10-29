import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.beforeEach(async ({ page }) => {
  const authFile = 'playwright/.auth/userr.json';
  
  if (fs.existsSync(authFile)) {
    const state = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
    
    // Inject the session storage data before routing or interacting
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        window.sessionStorage.setItem(key, value as string);
      }
    }, state.sessionStorage);
  }
});

test('Access protected dashboard directly', async ({ page }) => {
  // Navigating here works immediately because session storage was pre-filled
await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');
});
