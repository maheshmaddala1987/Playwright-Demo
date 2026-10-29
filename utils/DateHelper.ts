import { test, expect, type Page } from '@playwright/test';

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

class DatePicker {
  constructor(private page: Page, private fieldLabel: string) {}

  async select(target: Date) {
    await this.page.getByLabel(this.fieldLabel).click();
    const header = this.page.getByRole('heading', { level: 2 }); // month/year title
    const want = target.toLocaleDateString('en-US', {
      month: 'long', year: 'numeric',
    });

    for (let i = 0; i < 36; i++) {
      if ((await header.innerText()).trim() === want) break;
      await this.page.getByRole('button', { name: 'Next month' }).click();
    }

    await this.page
      .getByRole('gridcell', { name: String(target.getDate()), exact: true })
      .click();
  }
}

test('book a stay seven days from today', async ({ page }) => {
  const today = new Date('2026-07-01T09:00:00');
  await page.clock.setFixedTime(today);
  await page.goto('https://example.com/booking');

  const checkIn = new DatePicker(page, 'Check-in date');
  await checkIn.select(addDays(today, 7)); // always 8 July 2026

  await expect(page.getByLabel('Check-in date')).toHaveValue('2026-07-08');
});