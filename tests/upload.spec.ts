import {test,expect} from '@playwright/test';
import * as fs from 'fs';
import path, { dirname } from 'path';

test.describe('Handling upload files in different ways',async()=>{

test('upload file', async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay');

const fileuploadElement = page.getByRole('heading',{name:'File Upload'});
await fileuploadElement.scrollIntoViewIfNeeded();

const filePath:string = path.join(__dirname,'../upload/sample1.pdf');
const filePath1:string = path.join(__dirname,'../upload/Test1.txt');
//await page.locator('#singleFileInput').setInputFiles(filePath);

await page.locator('#multipleFilesInput').setInputFiles([filePath,filePath1]);

});

/*If clicking an upload button dynamically opens the OS file dialog box,
 intercept the event using page.waitForEvent('filechooser')*/
test('Upload a file via a custom UI button', async({page})=>{

   await page.goto('');

     // Start waiting for the file chooser before clicking the trigger button
   const filePath = path.join(__dirname,'../upload/sample1.pdf');
   const downloadFileChooser = page.waitForEvent('filechooser');
   await page.locator('#multipleFilesInput').click();
   const fileChooser = await downloadFileChooser;

    // Set the files on the intercepted file chooser element
   await fileChooser.setFiles(filePath);


})




});