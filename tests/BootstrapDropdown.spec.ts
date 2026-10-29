import { test, expect } from '@playwright/test';

test('Handle Bootstrap Dropdown Element', async ({ page }) => {

    
await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns',{waitUntil:'domcontentloaded'});

await page.getByTestId('dropdown-language').click();
const options = await page.locator('.select-option').all();


for(const option of options){
const text = await option.textContent();
if(text?.includes('Ruby')){
    await option.click();
    break;
}}
//await page.setDefaultTimeout(5000);

await page.pause();
  
});
