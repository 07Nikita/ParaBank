# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API\POST-transferFunds.spec.ts >> transfer funds
- Location: tests\API\POST-transferFunds.spec.ts:6:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import data from "../../data/data.json"
  3  | 
  4  | let baseURL = "https://parabank.parasoft.com/parabank/services/bank"
  5  | 
  6  | test("transfer funds",async({request})=>{
  7  | 
  8  |     let transferAmount = 10
  9  | 
  10 |     let res = await request.post(`${baseURL}/transfer?fromAccountId=${data.accountId}&toAccountId=${data.newAccountId}&amount=${transferAmount}`)
  11 | 
> 12 |     expect(res.status()).toBe(200)
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  13 | 
  14 |     let body = await res.text()
  15 | 
  16 |     console.log(body)
  17 | 
  18 |     expect(body).not.toContain("error")
  19 | })
```