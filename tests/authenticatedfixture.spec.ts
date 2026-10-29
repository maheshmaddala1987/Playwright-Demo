import { test, expect } from '../fixtures/authenticatedfixture';

// Test using the hook-style fixture (authenticatedPage)
test('should display profile details after auto-login', async ({ authenticatedPage, page }) => {
  // Playwright runs the setup code inside 'authenticatedPage' before entering this block
  //await expect(page.locator('.profile-header')).toBeVisible();

await page.setDefaultTimeout(5000);

const loginSuccess = await page.getByText('Products').textContent();
expect(loginSuccess).toEqual('Products');
  
  // Playwright runs the teardown code inside 'authenticatedPage' after this block finishes
});