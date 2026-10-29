import { test, expect } from '@playwright/test';

test('find playwright builtin locators', async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay',{waitUntil:'domcontentloaded'});

/*const isDomLoaded = await page.evaluate(() => {
  return document.readyState === 'interactive' || document.readyState === 'complete';
});

console.log(`Is DOM loaded? ${isDomLoaded}`);*/

const fullName = page.getByRole('textbox',{name:'Full name'});
await expect(fullName).toBeVisible();
await fullName.fill('Mahesh');
const inputtext = await fullName.inputValue();
await expect(inputtext).toEqual('Mahesh');

const address = page.getByLabel('Address');
await expect(address).toBeVisible();
await expect(address).toBeEnabled();

//await expect(address).toBeFocused();

const radioBtn = page.getByRole('radio', { name: 'Male', exact: true });
await expect(radioBtn).not.toBeChecked();
  if (await radioBtn.isChecked()) {
    console.log('The radio button is already selected.');
  } else {
    console.log('The radio button is not selected. Checking it now...');
    await radioBtn.check();
  }
await radioBtn.check();
await expect(radioBtn).toBeChecked();
expect(radioBtn.isChecked).toBeTruthy();

//select all radio buttons on page

const allRadioButtons = await page.getByRole('radio').all();
for(const radioButton of allRadioButtons){
    if(!await radioButton.isChecked()){
        await radioButton.check();
        await expect(radioButton).toBeChecked();
    }
}

//select multiple checkboxes

const moncheckbox = page.getByRole('checkbox',{name:'mon'});
await moncheckbox.check();

const checkboxes = await page.getByRole('checkbox').all();

for(const checkbox of checkboxes){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
}


//Handling date picker

const dat = page.getByPlaceholder('mm/dd/yyyy');
await dat.click();
const selectDate = await page.getByRole('link',{name:'5'}).first();
await selectDate.click();
await expect(dat).toHaveValue('10/05/2026');


const dat1 = page.locator('#datepicker2');
await dat1.click();

const month = page.locator('.ui-datepicker-month');
await month.selectOption({index:2});

const year = page.locator('.ui-datepicker-year');
await year.selectOption({index:2});

const selectDatee = await page.getByRole('link',{name:'5'}).first();
await selectDatee.click();

await expect(dat1).toHaveValue('05/03/2002');


// select date from date range 

const dateRange1 = page.getByPlaceholder('Start Date');
await dateRange1.click();
await dateRange1.pressSequentially('21-09=2026');


const endDateRange = page.getByPlaceholder('End Date');
await endDateRange.click();
await endDateRange.pressSequentially('21-10-2026');

await page.locator('button').filter({ hasText: 'Submit' }).last().click();
const submitText = page.getByText('You selected a range of 30 days.');
const textValue = await submitText.textContent();
console.log(textValue);

expect(await submitText.textContent()).toContain('You selected a range of 30 days.');

  

  //await page.setDefaultTimeout(2000);
 // await page.close();


})