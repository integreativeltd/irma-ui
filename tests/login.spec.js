import { test, expect } from '@playwright/test';

test('successful login flow', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form with correct credentials
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test@example.com');
  await page.locator('#password').fill('password123');
  
  // Click login and wait for navigation
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation and verify redirect with longer timeout
  await expect(page).toHaveURL('/', { timeout: 10000 });
});

test('should show error with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form with incorrect credentials
  await page.getByRole('textbox', { name: 'Email Address' }).fill('wrong@example.com');
  await page.locator('#password').fill('wrongpassword');
  
  // Click login and wait for error message
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for and verify error message with longer timeout
  await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible({ timeout: 10000 });
  
  // Verify we're still on the login page
  await expect(page).toHaveURL('/login');
});

test('successful registration flow', async ({ page }) => {
  await page.goto('/register');

  const uniqueEmail = `test${Date.now()}@example.com`;

  // Fill in the registration form with unique email
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(uniqueEmail);
  await page.locator('#password').fill('password123');
  
  // Add console listener to capture network errors
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`Console ${msg.type()}: ${msg.text()}`);
    }
  });

  // Click register and wait for response
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/auth/register')),
    page.getByRole('button', { name: 'Register' }).click()
  ]);
  
  // Wait for navigation with longer timeout
  await expect(page).toHaveURL('/', { timeout: 10000 });
});

test('should show error when registering with existing email', async ({ page }) => {
  await page.goto('/register');

  // Fill in the registration form with more specific selectors
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Another User');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test@example.com');
  await page.locator('#password').fill('password123');
  
  // Click register and wait for error message
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Wait for and verify error message with longer timeout
  await expect(page.getByText('Email already exists', { exact: true })).toBeVisible({ timeout: 10000 });
  
  // Verify we're still on the register page
  await expect(page).toHaveURL('/register');
});

test('navigation between login and register pages', async ({ page }) => {
  // Start at login page
  await page.goto('/login');
  
  // Navigate to register page
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL('/register');
  
  // Navigate back to login page
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('/login');
});