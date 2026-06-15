# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Negative\negAmountTransfer.spec.ts >> Transfer Negative Amount
- Location: tests\Negative\negAmountTransfer.spec.ts:5:6

# Error details

```
Error: expect(locator).not.toHaveText(expected) failed

Locator:  locator('#rightPanel h1').nth(1)
Expected: not "Transfer Complete!"
Received: "Transfer Complete!"
Timeout:  5000ms

Call log:
  - Expect "not toHaveText" with timeout 5000ms
  - waiting for locator('#rightPanel h1').nth(1)
    13 × locator resolved to <h1 class="title">Transfer Complete!</h1>
       - unexpected value "Transfer Complete!"

```

```yaml
- heading "Transfer Complete!" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Login from "../../POM/login-logout"
  3  | import transferFund from "../../POM/transfer-fund"
  4  | 
  5  | test.fail('Transfer Negative Amount',async({page})=>{
  6  | 
  7  |     const loginPage = new Login(page)
  8  |     const transfer = new transferFund(page)
  9  | 
  10 |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  11 | 
  12 |     await loginPage.loginUser()
  13 | 
  14 |     await transfer.transferFundBtn.click()
  15 | 
  16 |     await transfer.fromAccount.selectOption({index: 0})
  17 | 
  18 |     await transfer.toAccount.selectOption({index: 1})
  19 | 
  20 |     await transfer.amount.fill('-100')
  21 | 
  22 |     await transfer.submitBtn.click()
  23 | 
> 24 |     await expect(page.locator('#rightPanel h1').nth(1)).not.toHaveText('Transfer Complete!')
     |                                                             ^ Error: expect(locator).not.toHaveText(expected) failed
  25 |     //! failed 
  26 | 
  27 |     await page.screenshot({path: `screenshots/NEG/TC-NEG-04-negativeAmountTransfer.png`})
  28 | 
  29 | })
```