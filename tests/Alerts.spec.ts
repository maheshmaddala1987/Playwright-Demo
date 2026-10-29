import {test,expect} from '@playwright/test';

test.describe('Handling alerts , prompts and confirm popups ',()=>{

    test.beforeEach( async({page})=>{
     await page.goto('https://sdetqa.vercel.app/autoplay');
     console.log(await page.title())


    })



test('Handling alerts', async ({page})=> {
  
    page.on('dialog', async (dialog)=>{

        console.log(dialog.type())
        console.log(dialog.message());

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Simple alert');
        await dialog.accept(); 
    })

await page.getByRole('button',{name:'Simple'}).click();

})


test('dismiss the alert',async({page})=>{

    page.on('dialog',async(dialog)=>{

        console.log(dialog.type());
        console.log(dialog.message());

        await dialog.dismiss();
    })

    await page.getByRole('button',{name:'Confirm'}).click();


})


test('handling prompt', async({page})=>{

    page.on('dialog', async(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        await dialog.accept('Hello');
    })

    await page.getByRole('button',{name:'Prompt'}).click();

})



})