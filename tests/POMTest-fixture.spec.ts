import {test, expect} from '../fixtures/pageobjectfixture';
import { readExcelData } from '../utils/excelReader';

/*
### Why this structure is efficient:
* **Zero Boilerplate:** No need for repetitive `new LoginPage(page)` calls inside tests. 
* **Lazy Loading:** Playwright initializes only the fixtures explicitly requested by a test.
* **Pre-Execution Setup (Optional):** Handle navigation or pre-authentication directly 
*    within the fixture hook prior to calling `use`.
*/

// Define a type script interface for your data row mapping
interface UserTestData {
  username: string;
  password: string;
}

// Call the custom method to retrieve parsed records
const testData = readExcelData<UserTestData>('test-data/test-users.xlsx');
for (const record of testData) {
test(`POM first test with external data - ${record.username} : ${record.password}`, async ({loginPage,page})=>{

//const loginPage = new LoginPage(page);

await loginPage.navigateTo();
const headerText = await loginPage.homePageHeader();
expect(headerText).toEqual('Swag Labs');
await loginPage.login(record.username,record.password);
const dashboardHeader = await loginPage.getHeaderText();
expect(dashboardHeader).toEqual('Products');
await loginPage.appLogout();

});

}