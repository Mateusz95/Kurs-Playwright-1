import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
  test('login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('matgat12');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('admin123');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('unsuccessful login with to short login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('matgat');
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('unsuccessful login with to short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('matgat12');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('admin13');
   await page.getByTestId('password-input').blur();
    
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
});