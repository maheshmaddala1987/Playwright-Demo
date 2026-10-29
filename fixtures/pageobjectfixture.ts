import {test as base , expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';

interface loginData{
    loginPage:LoginPage;
    homePage: HomePage;
    
}

export const test = base.extend<loginData>({
    loginPage: async({page},use)=>{
        await use(new LoginPage(page));
    },

    // Fixture Dependencies in Playwright
    homePage: async ({ loginPage ,page}, use) => {
    await use(new HomePage(page));
  },

});

/*

Worker-Scoped Fixtures for Parallel Testing
Now let me show you one last, very useful example: worker-scoped fixtures.

What is a worker? Think about it as a single executor of your tests.
When you run your tests in parallel, Playwright triggers several workers to execute 
your tests. Separating your tests by worker scope is very useful to avoid concurrency issues.
 For example, when you are trying to use the same account in parallel tests, you may have problems because the same account may stumble on the same test data, making your tests flaky.

Worker-scoped fixtures solve this. They run once when a worker starts and stay active
 for every test that worker executes.

*/





type WorkerFixture = {
  cupOfCoffee: string;
};

export const tests = base.extend<loginData, WorkerFixture>({
  // ...test-scoped fixtures
  cupOfCoffee: [async ({}, use, workerInfo) => {
    const cup = 'Cup of coffee number ' + workerInfo.workerIndex;
    await use(cup);
  }, { scope: 'worker' }],
});

export { expect };
