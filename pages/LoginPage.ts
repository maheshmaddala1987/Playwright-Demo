// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Strongly type locators as readonly properties
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly headerValue:Locator;
  private readonly menu:Locator;
  private readonly logOut:Locator;
  private readonly homepageHeader:Locator;

  constructor(page: Page) {
    // Pass the page instance to the BasePage constructor
    super(page); 
    
    // Initialize elements using semantic Playwright locators
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.headerValue = page.getByText('Products');
    this.menu = page.getByRole('button',{name:'Open Menu'});
    this.logOut = page.getByRole('button', { name: 'Logout' });
    this.homepageHeader = page.getByText('Swag Labs',{exact:true});
  }

  async login(username: string, password: string): Promise<void> {
    // We can use native page interactions alongside BasePage actions
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async getHeaderText():Promise<string> {
    return (await this.headerValue.textContent()) ?? '';
  }

  async homePageHeader():Promise<string> {
    return (await this.homepageHeader.textContent()) ?? '';
  }

  async appLogout():Promise<void>{
   await this.menu.click();
    await this.logOut.click();
  }
}
