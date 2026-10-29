// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // Use 'protected' so child classes can access the page instance
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common helper method to navigate to a URL
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Common helper method to get the page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Common wait utility
  async waitForElementToBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
