import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 import dotenv from 'dotenv';
 import path from 'path';

 // Read from process.env.NODE_ENV, default to 'dev' if not specified
//const environment = process.env.NODE_ENV || 'dev';
dotenv.config({
  path: process.env.TEST_ENV ? `./env-files/.env.${process.env.TEST_ENV}` : './env-files/.env.dev',
  override: true,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
 // Sharding splits the suite across machines; use workers per machine as needed
  workers: process.env.CI ? 2 : undefined,


  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',

 //Use blob reporter during CI/sharding to combine reports later
  reporter: process.env.CI ? [['blob'], ['html']] : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
     baseURL: process.env.BASEURL,
       
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless:false,
  },

  /* Configure projects for major browsers */
  projects: [




     /*{
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 7'],
      },
    },*/
    /* Test against mobile Safari emulation */
    /*{
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 14'],
      },
    },*/

  /*   {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },*/


    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        //storageState: 'playwright/.auth/user.json',
       },
       // dependencies: ['setup'], // Forces setup to run before these tests
    },

/*    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
