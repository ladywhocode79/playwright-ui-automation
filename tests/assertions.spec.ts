import {test,  expect } from '@playwright/test';

test.describe('Assertions in Playwright', () => {

    test('toBe and not.toBe example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const loginButton = page.getByRole('button', { name: ' Login' });
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toBeEnabled();
        await expect(loginButton).not.toBeDisabled();
    });

    test('toHaveText example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const loginHeading = page.getByText('Login Page');
        await expect(loginHeading).toHaveText('Login Page');
    });

    test('toHaveAttribute example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const usernameInput = page.getByLabel('Username');
        await expect(usernameInput).toHaveAttribute('id', 'username');
    });

    test('toHaveValue example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const usernameInput = page.getByLabel('Username');
        await usernameInput.fill('tomsmith');
        await expect(usernameInput).toHaveValue('tomsmith');
    });

    test('toHaveClass example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const loginButton = page.getByRole('button', { name: ' Login' });
        await expect(loginButton).toHaveClass(/radius/);
    });

    // test('toHaveId example', async ({ page }) => {
    //     await page.goto('https://the-internet.herokuapp.com/login');
    //     const loginForm = page.getByTestId('login-form');
    //     await expect(loginForm).toHaveId('login');
    // });

    test('toBeVisible and toBeEnabled example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const usernameInput = page.getByLabel('Username');
        await expect(usernameInput).toBeVisible();
        await expect(usernameInput).toBeEnabled();
    });

    test('auto-retry example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword');
        await page.getByRole('button', { name: ' Login' }).click();
        
         //Locating elements using getByText
        const errorMessage = page.getByText('Your password is invalid! ×');
        await expect(errorMessage).toBeVisible();
    });
    test('soft assertions example', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const usernameInput = page.getByLabel('Username');
        await expect.soft(usernameInput).toBeVisible();
        await expect.soft(usernameInput).toBeEnabled();

        const passwordInput = page.getByLabel('Password');
        await expect.soft(passwordInput).toBeVisible();
        await expect.soft(passwordInput).toBeEnabled();

        const loginButton = page.getByRole('button', { name: ' Login' });
        await expect.soft(loginButton).toBeVisible();
        await expect.soft(loginButton).toBeEnabled();
    });
    test('Negative login test using getBy* locators', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword');
        await page.getByRole('button', { name: ' Login' }).click();
        
         //Locating elements using getByText
        const errorMessage = page.getByText('Your password is invalid! ×');
        await expect(errorMessage).toBeVisible();
    });
 test('multiple soft assertion and then checking all assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    const usernameInput = page.getByLabel('Username');
    await expect.soft(usernameInput).toBeVisible();
    await expect.soft(usernameInput).toBeEnabled();

    const passwordInput = page.getByLabel('Password');
    await expect.soft(passwordInput).toBeVisible();
    await expect.soft(passwordInput).toBeEnabled();

    const loginButton = page.getByRole('button', { name: ' Login1' });
    await expect.soft(loginButton).toBeVisible();
    await expect.soft(loginButton).toBeEnabled();

    const errors = test.info().errors;
    expect(errors.length, `There were ${errors.length} soft assertion failures`).toBe(0);
     //Continue with test execution
     await page.getByLabel('Username').fill('tomsmith');
     await page.getByLabel('Password').fill('SuperSecretPassword');
     await page.getByRole('button', { name: ' Login' }).click();
     
      //Locating elements using getByText
     const errorMessage = page.getByText('Your password is invalid! ×');
     await expect(errorMessage).toBeVisible();
   });

     //Continue with test execution

});