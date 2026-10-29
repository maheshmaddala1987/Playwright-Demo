import { chromium, test } from '@playwright/test';

test('Handling Tab and windows in playwright', async () => {
    const browser = await chromium.launch({
        channel: 'chrome',
        headless: false
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    //Creata a  event listener to handle cookcies the new tab/window

    page.on('framenavigated', async () => {
        let coockiesAcceptedButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if (await coockiesAcceptedButton.isVisible()) {
            await coockiesAcceptedButton.click();
        }

    })



    await page.goto('https://www.orangehrm.com/en/contact-sales/');

    // Handle the cookie consent popup
    // await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

    // target="_blank" opens a new tab/window
    let [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(`//a[contains(@href ,'linkedin')]`).click()
    ]);

    // Wait for the new tab to load
    await newTab.waitForLoadState();

    console.log('Parent page URL:', page.url());
    console.log('New tab URL:', newTab.url());
    console.log('New tab title:', await newTab.title());

    await page.waitForTimeout(5000);

    // await browser.close();
});
