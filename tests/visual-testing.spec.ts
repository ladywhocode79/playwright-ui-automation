import { test, expect } from '@playwright/test';

test.describe('Visual testing with Playwright', () => {
    test('should take a screenshot of the login page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.screenshot({ path: 'login-page.png' });
    });

    test('should compare the screenshot with a baseline image', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        expect(await page.screenshot()).toMatchSnapshot('login-page.png');
    });

    test('full page screenshot', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page).toHaveScreenshot({ fullPage: true });
    });

    test('screenshot of a specific element', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const loginButton = page.getByRole('button', { name: 'Login' });
        await expect(loginButton).toHaveScreenshot('login-button.png');
    });
    test('Masked screenshot for sensitive information', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page).toHaveScreenshot('login-info-masked.png',
            {
                fullPage: true,
                mask: [
                    page.locator('#username'),
                    page.locator('#password')
                ]
            });
    });
});
