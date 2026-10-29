import { test, expect} from '@playwright/test';


test('handle bootstrap dropdowns', async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay');

await page.locator('#country').click();

const options = await page.locator('#country').locator('option').all();

for (const option of options) {

   // console.log(await option.textContent());

    const value = await option.textContent();
    if(value?.trim()=== 'USA'){
       await option.click();
        break;
    }

}



})



