import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { readExcelData } from '../utils/excelReader';


// Define a type script interface for your data row mapping
interface UserTestData {
  username: string;
  password: string;
}

// Call the custom method to retrieve parsed records
const testData = readExcelData<UserTestData>('test-data/test-users.xlsx');
for (const record of testData) {
test(`POM first test with external data - ${record.username} : ${record.password}`, async ({page})=>{

const loginPage = new LoginPage(page);

await loginPage.navigateTo();
const headerText = await loginPage.homePageHeader();
expect(headerText).toEqual('Swag Labs');
await loginPage.login(record.username,record.password);
const dashboardHeader = await loginPage.getHeaderText();
expect(dashboardHeader).toEqual('Products');
await loginPage.appLogout();

});

}