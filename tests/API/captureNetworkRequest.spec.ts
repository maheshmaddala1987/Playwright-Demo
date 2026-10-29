import {test, expect} from '@playwright/test';


//request
test('add to cart POSTs the right body', async ({ page }) => {
  await page.goto('/addProduct');

  const reqPromise = page.waitForRequest(
    (r) => r.url().includes('/Products/operation') && r.method() === 'POST',
  );

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  const req = await reqPromise;
  const body = JSON.parse(req.postData() || '{}');
  expect(body).toMatchObject({ productId: 1, quantity: 1 });
});

test('search returns at least one match', async ({ page }) => {
  await page.goto('/catalog');

  const responsePromise = page.waitForResponse(
    (r) => r.url().includes('/api/search') && r.status() === 200,
  );

  await page.getByPlaceholder('Search items').fill('notebook');
  await page.getByRole('button', { name: 'Search' }).click();

  const res = await responsePromise;
  const body = await res.json();
  expect(body.results.length).toBeGreaterThan(0);
});