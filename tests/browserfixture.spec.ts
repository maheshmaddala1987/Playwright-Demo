import {test,expect} from '../fixtures/browserFixtures';

test('launch application using browser fixture',async({page})=>{

await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

await page.getByRole('button', { name: 'Login' }).click({force:true});

const loginSuccess = await page.getByText('Products').textContent();
expect(loginSuccess).toEqual('Products');

await page.getByRole('button',{name:'Open Menu'}).click();

await page.getByRole('button', { name: 'Logout' }).click();


})