import {test, expect} from '@playwright/test';
import path from 'node:path';
import fs from 'fs';


test('download file', async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay');

// 2. Set up the event listener and trigger the download concurrently

const [download] = await Promise.all([

    page.waitForEvent('download'),
    page.getByRole('button',{name:'Download File'}).click(),
]);

 // 3. Get the browser-suggested filename
const fileName = download.suggestedFilename();

// 4. Define the path where you want to save the file
const savePath = path.join(__dirname,'../download/',fileName);

  // 5. Save the file (this waits for the download stream to complete)
await download.saveAs(savePath);

  // 6. Assert that the file was successfully created on disk
 expect(fs.existsSync(savePath)).toBeTruthy();

});


/*
Playwright downloads files into a temporary directory. To capture it,
 you must start listening for the download event before clicking 
 the download button to prevent missing a fast download
*/

test('Handling File Downloads - Download and verify a file', async ({ page }) => {
  await page.goto('https://example.com');

  // 1. Start listening for the download event
  const downloadPromise = page.waitForEvent('download');

  // 2. Trigger the download action
  await page.getByRole('button', { name: 'Download Report' }).click();

  // 3. Wait for the download process to complete and grab the object
  const download = await downloadPromise;

  // 4. Retrieve metadata
  const fileName = download.suggestedFilename(); // e.g., "report_2026.csv"
  console.log(`Downloaded file name: ${fileName}`);

  // 5. Save the file permanently to a designated folder
  const savePath = path.join(__dirname, '../download/', fileName);
  await download.saveAs(savePath);

  // 6. Assert that the file exists locally
  expect(fs.existsSync(savePath)).toBeTruthy();
});
