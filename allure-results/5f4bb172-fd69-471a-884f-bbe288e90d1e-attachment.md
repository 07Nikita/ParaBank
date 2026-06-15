# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\registration.spec.ts >> registration
- Location: tests\UI\registration.spec.ts:4:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel')
Expected substring: "Your account was created successfully. You are now logged in."
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel')

```

```yaml
- main:
  - img "Icon for parabank.parasoft.com"
  - heading "parabank.parasoft.com" [level=1]
  - heading "Performing security verification" [level=2]
  - paragraph: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
- contentinfo:
  - text: "Ray ID:"
  - code: a0b67d8ac85e09ba
  - text: Performance and Security by
  - link "Cloudflare":
    - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
  - link "Privacy":
    - /url: https://www.cloudflare.com/privacypolicy/
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Registration from "../../POM/registration"
  3  | 
  4  | test("registration", async ({ page }) => {
  5  |     
  6  |     const reg = new Registration(page)
  7  |     
  8  |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  9  |     
  10 |     await reg.navigateToRegister()
  11 | 
  12 |     await expect(page).toHaveURL(/register.htm/)
  13 |     
  14 |     await reg.registerUser2()
  15 |     
> 16 |     await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.')
     |                                               ^ Error: expect(locator).toContainText(expected) failed
  17 | 
  18 |     await page.screenshot({path:'screenshots/UI/registration.png'})
  19 | 
  20 |     // await reg.collectAccId()
  21 | 
  22 |    
  23 | })
```