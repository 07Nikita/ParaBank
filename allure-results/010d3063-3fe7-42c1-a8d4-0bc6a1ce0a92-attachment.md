# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Negative\negAmountTransfer.spec.ts >> Transfer Negative Amount
- Location: tests\Negative\negAmountTransfer.spec.ts:5:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Transfer Funds' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a0b7b335ea91e61a •"
    - generic [ref=e7]: 2026-06-14 07:42:44 UTC
    - heading "You are being rate limited" [level=2] [ref=e8]
  - generic [ref=e10]:
    - heading "What happened?" [level=2] [ref=e11]
    - paragraph [ref=e12]: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
    - paragraph [ref=e13]:
      - text: Please see
      - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/" [ref=e14] [cursor=pointer]:
        - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
      - text: for more details.
  - generic [ref=e16]:
    - text: Was this page helpful?
    - button "Yes" [ref=e17] [cursor=pointer]
    - button "No" [ref=e18] [cursor=pointer]
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: a0b7b335ea91e61a
    - text: •
    - generic [ref=e23]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e24] [cursor=pointer]
      - text: •
    - generic [ref=e25]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e26] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Login from "../../POM/login-logout"
  3  | import transferFund from "../../POM/transfer-fund"
  4  | 
  5  | test('Transfer Negative Amount',async({page})=>{
  6  | 
  7  |     const loginPage = new Login(page)
  8  |     const transfer = new transferFund(page)
  9  | 
  10 |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  11 | 
  12 |     await loginPage.loginUser()
  13 | 
> 14 |     await transfer.transferFundBtn.click()
     |                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  15 | 
  16 |     await transfer.fromAccount.selectOption({index: 0})
  17 | 
  18 |     await transfer.toAccount.selectOption({index: 1})
  19 | 
  20 |     await transfer.amount.fill('-100')
  21 | 
  22 |     await transfer.submitBtn.click()
  23 | 
  24 |     await expect(page.locator('#rightPanel h1').nth(1)).not.toHaveText('Transfer Complete!')
  25 |     //! failed 
  26 | 
  27 |     await page.screenshot({path: `screenshots/NEG/TC-NEG-04-negativeAmountTransfer.png`})
  28 | 
  29 | })
```