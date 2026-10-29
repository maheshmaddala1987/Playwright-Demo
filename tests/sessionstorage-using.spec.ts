import { test, expect } from '@playwright/test';
import * as fs from 'fs';



/*test.beforeEach(async ({ page }) => {
  const authFile = 'playwright/.auth/storage.json';
  
  if (fs.existsSync(authFile)) {
    const state = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
    
    // Inject the session storage data before routing or interacting
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        window.sessionStorage.setItem(key, value as string);
      }
    }, state.sessionStorage);
  }
});*/






test('Access protected dashboard directly', async ({ browser }) => {


test.setTimeout(120000); 
const context=await browser.newContext()

const page=await context.newPage()

// Read Session Storage from file
 const sessionStorageData = JSON.parse(fs.readFileSync('playwright/.auth/storage.json', 'utf8') );

 /*
await context.addInitScript((storage) => {
       Object.keys(storage).forEach(key => {
            sessionStorage.setItem(key, storage[key]);
        });
 }, sessionStorageData);
*/

//{"auth_session_user":"admin","auth_session_admin":"authenticated"}

 //or using loop
    await context.addInitScript((storage) => {
        for (const key in storage) {
            sessionStorage.setItem(key, storage[key]);
        }
    }, sessionStorageData);


  // Navigating here works immediately because session storage was pre-filled
  await page.goto('https://www.saucedemo.com/');
  const loginSuccess = await page.getByText('Products').textContent();
  expect(loginSuccess).toEqual('Products');
});
