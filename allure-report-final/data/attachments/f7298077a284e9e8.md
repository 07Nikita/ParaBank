# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: E2E\transferFunds.spec.ts >> tranfer via ui validate via api
- Location: tests\E2E\transferFunds.spec.ts:9:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: -4030
Received: -4020
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Smith
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Transfer Complete!" [level=1] [ref=e51]
        - paragraph [ref=e52]: "$10.00 has been transferred from account #12345 to account #12456."
        - paragraph [ref=e53]: See Account Activity for more details.
  - generic [ref=e55]:
    - list [ref=e56]:
      - listitem [ref=e57]:
        - link "Home" [ref=e58] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e59]:
        - link "About Us" [ref=e60] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e61]:
        - link "Services" [ref=e62] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e63]:
        - link "Products" [ref=e64] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e65]:
        - link "Locations" [ref=e66] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e67]:
        - link "Forum" [ref=e68] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e69]:
        - link "Site Map" [ref=e70] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "Contact Us" [ref=e72] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e73]: © Parasoft. All rights reserved.
    - list [ref=e74]:
      - listitem [ref=e75]: "Visit us at:"
      - listitem [ref=e76]:
        - link "www.parasoft.com" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import login from "../../POM/login-logout"
  3  | import transferFund from "../../POM/transfer-fund"
  4  | import accOverview from "../../POM/accOverview"
  5  | import testData from "../../data/data.json"
  6  | 
  7  | let baseURL = "https://parabank.parasoft.com/parabank/services/bank"
  8  | 
  9  | test('tranfer via ui validate via api', async ({ page, request }) => {
  10 | 
  11 |     const loginPage = new login(page)
  12 |     const transfer = new transferFund(page)
  13 |     const overview = new accOverview(page)
  14 | 
  15 |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  16 | 
  17 |     await loginPage.loginUser()
  18 | 
  19 |     await overview.accountOverview()
  20 | 
  21 |     const fromAcc = (await overview.from.textContent())?.trim()
  22 |     const toAcc = (await overview.to.textContent())?.trim()
  23 | 
  24 |     console.log("From Account:", fromAcc)
  25 |     console.log("To Account:", toAcc)
  26 | 
  27 |     const fromBeforeRes = await request.get(`${baseURL}/accounts/${fromAcc}`,
  28 |         {
  29 |             headers: {
  30 |                 Accept: "application/json"
  31 |             }
  32 |         }
  33 |     )
  34 | 
  35 |     const toBeforeRes = await request.get(`${baseURL}/accounts/${toAcc}`,
  36 |         {
  37 |             headers: {
  38 |                 Accept: "application/json"
  39 |             }
  40 |         }
  41 |     )
  42 | 
  43 |     expect(fromBeforeRes.status()).toBe(200)
  44 |     expect(toBeforeRes.status()).toBe(200)
  45 | 
  46 |     const fromBeforeBody = await fromBeforeRes.json()
  47 |     const toBeforeBody = await toBeforeRes.json()
  48 | 
  49 |     const fromBalBefore = Number(fromBeforeBody.balance)
  50 |     const toBalBefore = Number(toBeforeBody.balance)
  51 | 
  52 |     console.log("Before Transfer")
  53 |     console.log("From Balance:", fromBalBefore)
  54 |     console.log("To Balance:", toBalBefore)
  55 | 
  56 |     await transfer.transfer()
  57 | 
  58 |     await expect(page.locator('#rightPanel h1').nth(1)).toHaveText('Transfer Complete!')
  59 | 
  60 |     const fromAfterRes = await request.get(`${baseURL}/accounts/${fromAcc}`,
  61 |         {
  62 |             headers: {
  63 |                 Accept: "application/json"
  64 |             }
  65 |         }
  66 |     )
  67 | 
  68 |     const toAfterRes = await request.get(`${baseURL}/accounts/${toAcc}`,
  69 |         {
  70 |             headers: {
  71 |                 Accept: "application/json"
  72 |             }
  73 |         }
  74 |     )
  75 | 
  76 |     expect(fromAfterRes.status()).toBe(200)
  77 |     expect(toAfterRes.status()).toBe(200)
  78 | 
  79 |     const fromAfterBody = await fromAfterRes.json()
  80 |     const toAfterBody = await toAfterRes.json()
  81 | 
  82 |     const fromBalAfter = Number(fromAfterBody.balance)
  83 |     const toBalAfter = Number(toAfterBody.balance)
  84 | 
  85 |     console.log("After Transfer")
  86 |     console.log("From Balance:", fromBalAfter)
  87 |     console.log("To Balance:", toBalAfter)
  88 | 
  89 |     const transferAmount = Number(testData.amount)
  90 | 
> 91 |     expect(fromBalAfter).toBe(fromBalBefore - transferAmount)
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  92 | 
  93 |     expect(toBalAfter).toBe(toBalBefore + transferAmount)
  94 | 
  95 | })
```