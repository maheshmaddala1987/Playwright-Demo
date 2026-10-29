import {test , expect } from '@playwright/test';
import { readJsonArray } from '../utils/jsonReader';

import userData from '../test-data/singleuser.json';


// 1. Define the TypeScript structure interface
interface UserTestData {
  username: string;
  password: string;
}

const testCases = readJsonArray<UserTestData>('test-data/users.json');

test.describe('Role Validation Suite', () => {
  for (const data of testCases) {
test(`data driven test using json Array : ${data.username} and ${data.password}` , async({page})=>{

await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill(data.username);

await page.getByRole('textbox', { name: 'Password' }).fill(data.password);

await page.getByRole('button', { name: 'Login' }).click({force:true});

const loginSuccess = await page.getByText('Products').textContent();
expect(loginSuccess).toEqual('Products');

await page.getByRole('button',{name:'Open Menu'}).click();

await page.getByRole('button', { name: 'Logout' }).click();

});
  
}


test(`data driven test using json Object : ${userData.username} and ${userData.password}` , async({page})=>{

await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill(userData.username);

await page.getByRole('textbox', { name: 'Password' }).fill(userData.password);

await page.getByRole('button', { name: 'Login' }).click({force:true});

const loginSuccess = await page.getByText('Products').textContent();
expect(loginSuccess).toEqual('Products');

await page.getByRole('button',{name:'Open Menu'}).click();

await page.getByRole('button', { name: 'Logout' }).click();

});



});