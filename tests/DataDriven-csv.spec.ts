import {test, expect} from '@playwright/test';
import { readCsvData } from '../utils/csvReader';


// Define a type script interface for your data row mapping
interface LoginTestData {
  username: string;
  password: string;
}



// Call the custom method to retrieve parsed records
const testRecords = readCsvData<LoginTestData>('test-data/loginData.csv');

test.describe('Data-Driven Login Tests via CSV', () => {

for (const record of testRecords) {

test(`data driven test using csv : ${record.username} and ${record.password}` , async({page})=>{

await page.goto('https://www.saucedemo.com/');

const headerValue = await page.getByText('Swag Labs',{exact:true}).textContent();
expect(headerValue).toEqual('Swag Labs');

await page.getByRole('textbox', { name: 'Username' }).fill(record.username);

await page.getByRole('textbox', { name: 'Password' }).fill(record.password);

await page.getByRole('button', { name: 'Login' }).click({force:true});

const loginSuccess = await page.getByText('Products').textContent();
expect(loginSuccess).toEqual('Products');

await page.getByRole('button',{name:'Open Menu'}).click();

await page.getByRole('button', { name: 'Logout' }).click();

});
}
});