# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: E2E\API-UI-validation.spec.ts >> TC-E2E-02
- Location: tests\E2E\API-UI-validation.spec.ts:8:5

# Error details

```
Error: apiRequestContext.get: getaddrinfo ENOTFOUND parabank.parasoft.com
Call log:
  - → GET https://parabank.parasoft.com/parabank/services/bank/login/john/demo
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Login from "../../POM/login-logout"
  3  | import accOverview from "../../POM/accOverview"
  4  | import data from "../../data/data.json"
  5  | 
  6  | let baseURL ="https://parabank.parasoft.com/parabank/services/bank"
  7  | 
  8  | test("TC-E2E-02", async ({page,request,}) => {
  9  | 
  10 |   //! API - Login
  11 | 
> 12 |   const loginRes = await request.get(`${baseURL}/login/${data.username}/${data.password}`,
     |                                  ^ Error: apiRequestContext.get: getaddrinfo ENOTFOUND parabank.parasoft.com
  13 |     {
  14 |       headers: {
  15 |         Accept: "application/json",
  16 |       },
  17 |     }
  18 |   )
  19 | 
  20 |   expect(loginRes.status()).toBe(200)
  21 | 
  22 |   const loginBody = await loginRes.json()
  23 | 
  24 |   const customerId = loginBody.id
  25 | 
  26 |   console.log("Customer ID:", customerId)
  27 | 
  28 |   //! API - Create Account
  29 |   
  30 | 
  31 |   const createRes = await request.post(`${baseURL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${data.accountId}`,
  32 |     {
  33 |       headers: {
  34 |         Accept: "application/json",
  35 |       },
  36 |     }
  37 |   )
  38 | 
  39 |   expect(createRes.status()).toBe(200)
  40 | 
  41 |   const createBody=await createRes.json()
  42 | 
  43 |   const newAccountId=createBody.id.toString()
  44 | 
  45 |   console.log("New Account Created:", newAccountId)
  46 | 
  47 |   //! UI
  48 | 
  49 |   const loginPage = new Login(page)
  50 |   const overview = new accOverview(page)
  51 | 
  52 |   await page.goto("https://parabank.parasoft.com/parabank/index.htm")
  53 | 
  54 |   await loginPage.loginUser()
  55 | 
  56 |   await overview.accountOverview()
  57 | 
  58 |   await expect(overview.accOverview).toBeVisible()
  59 | 
  60 |   //! Verify new account appears in UI
  61 | 
  62 |   const accountLocator = page.locator(`//tbody/tr/td/a[text()="${newAccountId}"]`)
  63 | 
  64 |   await expect(accountLocator).toBeVisible()
  65 | 
  66 |   console.log(`Account ${newAccountId} successfully displayed in UI`)
  67 | 
  68 |   await page.screenshot({path: "screenshots/E2E/api-UI.png"})
  69 | })
```