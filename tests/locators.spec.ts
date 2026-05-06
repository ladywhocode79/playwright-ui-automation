import { test, expect } from '@playwright/test';
test.describe('Login tests using locators', () => {

test('Negative login test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  //Examples of build in locators of playwright
  //getByRole, getByText, getByLabel, getByPlaceholder, getByAltText, getByTitle, getByTestId

  //Locating elements using getByRole
  const loginButton = page.getByRole('button', { name: ' Login' });
  await expect(loginButton).toBeVisible();
  //await expect(loginButton).toBeEnabled();

  //Locating elements using getByText
  const loginHeading = page.getByText('Login Page');
  await expect(loginHeading).toBeVisible();

  //Locating elements using getByLabel
  const usernameInput = page.getByLabel('Username');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEnabled();

  //Locating elements using getByPlaceholder
  

  //Locating elements using getByAltText
  

  //Locating elements using getByTitle
  

  //Locating elements using getByTestId
//   const loginForm = page.getByRole('form', { name: 'login' });
//   await expect(loginForm).toHaveId('login');


  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword');
  await page.getByRole('button', { name: ' Login' }).click();
  
   //Locating elements using getByText
  const errorMessage = page.getByText('Your password is invalid! ×');
  await expect(errorMessage).toBeVisible();
}
);

});
test.describe('Login tests using css selectors', () => {
    test('Negative login test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        //Locating elements using css selectors
        const usernameInput = page.locator('#username');
        await expect(usernameInput).toBeVisible();
        await expect(usernameInput).toBeEnabled();

        const passwordInput = page.locator('#password');
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toBeEnabled();

        const loginButton = page.locator('button[type="submit"]');
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toBeEnabled();

        await usernameInput.fill('tomsmith');
        await passwordInput.fill('SuperSecretPassword');
        await loginButton.click();

        const errorMessage = page.locator('.flash.error');
        await expect(errorMessage).toBeVisible();
    });

});

test.describe('Login tests using xpath selectors', () => {
    test('positive login test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        //Locating elements using xpath selectors
        const usernameInput = page.locator('//input[@id="username"]');
        await expect(usernameInput).toBeVisible();
        await expect(usernameInput).toBeEnabled();

        const passwordInput = page.locator('//input[@id="password"]');
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toBeEnabled();

        const loginButton = page.locator('//button[@type="submit"]');
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toBeEnabled();

        await usernameInput.fill('tomsmith');
        await passwordInput.fill('SuperSecretPassword!');
        await loginButton.click();

        const successMessage = page.locator('//div[contains(@class, "flash success")]');
        await expect(successMessage).toBeVisible();
    }); 
});
