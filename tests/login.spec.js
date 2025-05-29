import { test, expect } from '@playwright/test';

test('successful login flow', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form with correct credentials
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test@example.com');
  await page.locator('input[type="password"]').fill('password123');
  
  // Click login and wait for navigation
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation and verify redirect
  await expect(page).toHaveURL('/');
});

test('should show error with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form with incorrect credentials
  await page.getByRole('textbox', { name: 'Email Address' }).fill('wrong@example.com');
  await page.locator('input[type="password"]').fill('wrongpassword');
  
  // Click login and wait for error message
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify error message is displayed
  await expect(page.getByText('Invalid credentials')).toBeVisible();
  
  // Verify we're still on the login page
  await expect(page).toHaveURL('/login');
});