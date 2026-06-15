# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Performance-Test\repeated-GETrequest.spec.ts >> accounts api repeated 20 times
- Location: tests\Performance-Test\repeated-GETrequest.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | test("accounts api repeated 20 times", async ({ request }) => {
  4  | 
  5  |     for(let i = 1; i <= 20; i++){
  6  | 
  7  |         const response = await request.get(
  8  |             'https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts'
  9  |         )
  10 | 
  11 |         console.log(`Request ${i} completed`)
  12 | 
> 13 |         expect(response.ok()).toBe(true)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  14 |     }
  15 | 
  16 | })
```