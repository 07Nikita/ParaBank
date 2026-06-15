# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Negative\negAmountTransfer.spec.ts >> Transfer Negative Amount
- Location: tests\Negative\negAmountTransfer.spec.ts:5:5

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