import { test, expect } from '@playwright/test';

test('Handle hidden dropdown elements in OrangeHRM', async ({ page }) => {
    // 1. Navigate to the demo website
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Log in (Credentials are provided on the demo page)
    await page.locator('input[placeholder="Username"]').fill('Admin');
    await page.locator('input[placeholder="Password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // 3. Navigate to the PIM module
    await page.locator('//span[text()="PIM"]').click();

    // 4. Click the "Sub Unit" dropdown wrapper to trigger the hidden options
    const dropdownWrapper = page.locator(
        '//label[text()="Sub Unit"]/parent::div/following-sibling::div//div[@class="oxd-select-wrapper"]'
    );
    await dropdownWrapper.click();

    // 5. Select the hidden item by its text content once it appears in the DOM
    // Playwright automatically waits for actionability/visibility
    const optionToSelect = page.locator('div[role="listbox"]').getByText('OrangeHRM');
    await optionToSelect.click();

    // 6. Verification assertion
    await expect(dropdownWrapper).toContainText('OrangeHRM');
});
