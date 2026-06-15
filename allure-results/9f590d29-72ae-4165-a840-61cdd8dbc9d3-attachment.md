# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Negative\greaterAmountTransfer-api.spec.ts >> transfer more funds via API
- Location: tests\Negative\greaterAmountTransfer-api.spec.ts:6:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import data from "../../data/data.json"
  3  | 
  4  | let baseURL = "https://parabank.parasoft.com/parabank/services/bank"
  5  | 
  6  | test('transfer more funds via API', async ({ request }) => {
  7  | 
  8  |     const accountId = 12345
  9  |     const newAccountId = 12456
  10 | 
  11 |     let res = await request.post(`${baseURL}/transfer?fromAccountId=${accountId}&toAccountId=${newAccountId}&amount=9982537`)
  12 | 
  13 |     let body = await res.text()
  14 | 
  15 |     console.log("Status Code:", res.status())
  16 |     console.log(body)
> 17 |     expect(res.status()).toBe(400)
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  18 | 
  19 |     //! test failed
  20 | })
```