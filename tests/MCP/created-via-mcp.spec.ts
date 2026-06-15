import { test, expect } from '@playwright/test';

test.describe('ParaBank Complete Workflow via MCP', () => {
  const baseURL = 'https://parabank.parasoft.com/parabank';
  const username = 'john';
  const password = 'demo';

  test('Should complete full ParaBank workflow', async ({ page }) => {
    const usernameInput = page.locator('[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');
    const openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    const openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    const accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    const transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    const transferButton = page.getByRole('button', { name: 'Transfer' });
    const accountTypeSelect = page.locator('#type');
    const fromAccountSelect = page.locator('#fromAccountId');
    const toAccountSelect = page.locator('#toAccountId');
    const amountInput = page.locator('#amount');
    const newAccountId = page.locator('#newAccountId');
    const accountTable = page.locator('#accountTable');
    const logoutLink = page.getByRole('link', { name: 'Log Out' });
    const customerLoginHeading = page.locator('text=Customer Login');

    // Step 1: Open ParaBank
    await page.goto(`${baseURL}/index.htm`);
    await expect(page).toHaveTitle(/ParaBank/);

    // Step 2: Log in with username john and password demo
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();

    // Step 3: Verify successful login
    await page.waitForURL(`${baseURL}/**/overview.htm`);
    await expect(accountsOverviewLink).toBeVisible();
    const welcomeText = page.locator('text=Welcome');
    await expect(welcomeText).toBeVisible();

    // Step 4: Open a new Savings Account
    await openNewAccountLink.click();
    await page.waitForURL(`${baseURL}/**/openaccount.htm`);
    
    // Select account type as Savings
    await accountTypeSelect.selectOption('SAVINGS');
    
    // Select existing account to transfer from
    await expect(fromAccountSelect).toBeVisible();
    await fromAccountSelect.selectOption({ index: 0 });
    
    // Click Open New Account button
    await openNewAccountButton.click();
    await expect(newAccountId).toBeVisible();
    await expect(newAccountId).not.toHaveText('');

    // Step 5: Take a screenshot after opening new account
    await page.screenshot({ path: 'screenshots/after-account-opened.png' });

    // Navigate to Accounts Overview to proceed with transfer
    await accountsOverviewLink.click();
    await page.waitForURL(`${baseURL}/**/overview.htm`);

    // Step 6: Transfer $100 between two accounts
    await transferFundsLink.click();
    await page.waitForURL(`${baseURL}/**/transfer.htm`);
    
    // Select from account
    await expect(fromAccountSelect).toBeVisible();
    await fromAccountSelect.selectOption({ index: 0 });
    
    // Select to account
    await expect(toAccountSelect).toBeVisible();
    await toAccountSelect.selectOption({ index: 1 });
    
    // Enter transfer amount
    await amountInput.fill('100');
    
    // Submit transfer
    await transferButton.click();
    
    // Step 7: Take a screenshot of the confirmation page
    await page.waitForURL(`${baseURL}/**/transfer.htm`);
    await expect(page.locator('text=Transfer Complete')).toBeVisible();
    await page.screenshot({ path: 'screenshots/transfer-confirmation.png' });

    // Step 8: Open Accounts Overview
    await accountsOverviewLink.click();
    await page.waitForURL(`${baseURL}/**/overview.htm`);

    // Step 9: Verify account details are visible
    await expect(accountTable).toBeVisible();
    const accountRows = page.locator('#accountTable tbody tr');
  
    // Step 10: Log out
    await logoutLink.click();

    // Step 11: Take a final screenshot
    await page.screenshot({ path: 'screenshots/after-logout.png' });

  });
});
