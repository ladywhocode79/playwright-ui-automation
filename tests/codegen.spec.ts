import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {

test('Negative login test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword');
  await page.getByRole('button', { name: ' Login' }).click();
   await page.getByText('Your password is invalid! ×').click();
});
test('Positive login test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.getByText('You logged into a secure area').click();
  await page.getByRole('heading', { name: 'Welcome to the Secure Area.' }).click();
});
});