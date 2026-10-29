import {test, expect} from '@playwright/test';

//To retrieve an HTML attribute from an element in Playwright, you should use the locator.getAttribute('attributeName') method.

test('retrieve HTML attribute from an element using getAttribue()', async({page})=>{

await page.goto('https://www.saucedemo.com/');

const placeHolderValue = await page.locator('#user-name').getAttribute('placeholder');
console.log(placeHolderValue)

const ariaLabelValue = await page.locator('#user-name').getAttribute('aria-label');
console.log(ariaLabelValue);

const className = await page.locator('#login-button').getAttribute('class');
console.log(className)

const userNameInput = page.locator('#user-name');
await userNameInput.fill('mahesh');
const val = await userNameInput.getAttribute('value');
console.log(val);

await expect(page.locator('#login-button')).toHaveAttribute('type','submit');


})