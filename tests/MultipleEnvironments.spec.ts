import {test, expect} from '@playwright/test';
import { ENV } from '../utils/env';


test('Handling multiple Environments for running test', async ({ page }) => {
  //const baseUrl = (process.env.BASEURL ?? process.env.URL ?? 'https://www.saucedemo.com/').trim();
  //const username = (process.env.USERNAME ?? 'standard_user').trim();
  //const password = (process.env.PASSWORD ?? 'secret_sauce').trim();

 // console.log('+++++++++++++++++++++++++++')
  //console.log(username);
  await page.goto('/');
  await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click({ force: true });

  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});


// Here TEST_ENV is a variable from playwright.config.ts

//bash - TEST_ENV=dev npx playwright test tests/MultipleEnvironments.spec.ts 
// cmd - set TEST_ENV=dev
//        npx playwright test tests/MultipleEnvironments.spec.ts
         
//powershell - $env:TEST_ENV="dev";npx playwright test tests/MultipleEnvironments.spec.ts



//powershell - npm run-script test:dev
//cmd - npm run-script test:dev
//bash - npm run test:dev