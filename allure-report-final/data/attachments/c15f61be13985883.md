# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Negative\invalidLogin.spec.ts >> log in with invalid username
- Location: tests\Negative\invalidLogin.spec.ts:4:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel')
Expected substring: "The username and password could not be verified."
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel')

```

```yaml
- banner:
  - heading "Error 1015" [level=1]
  - text: "Ray ID: a0b7b331c862a798 • 2026-06-14 07:42:43 UTC"
  - heading "You are being rate limited" [level=2]
- heading "What happened?" [level=2]
- paragraph: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
- paragraph:
  - text: Please see
  - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/":
    - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
  - text: for more details.
- text: Was this page helpful?
- button "Yes"
- button "No"
- paragraph:
  - text: "Cloudflare Ray ID:"
  - strong: a0b7b331c862a798
  - text: "• Your IP:"
  - button "Click to reveal"
  - text: • Performance & security by
  - link "Cloudflare":
    - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Login from "../../POM/login-logout"
  3  | 
  4  | test('log in with invalid username',async({page})=>{
  5  | 
  6  |     const loginPage=new Login(page)
  7  | 
  8  |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  9  | 
  10 |     await loginPage.loginInvalidUser()
  11 | 
> 12 |     await expect(page.locator('#rightPanel')).toContainText('The username and password could not be verified.')
     |                                               ^ Error: expect(locator).toContainText(expected) failed
  13 | 
  14 |     await page.screenshot({path:`screenshots/NEG/TC-NEG-01-invalidLogin.png`})
  15 | 
  16 |     
  17 | })
```