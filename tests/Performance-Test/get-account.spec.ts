import { test, expect } from "@playwright/test"

test("accounts api response time under 2 seconds", async ({ request }) => {

    const start = Date.now()

    const res = await request.get('https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts')

    const response = Date.now() - start

    console.log(`Accounts API completed in ${response} ms`)


    expect(response).toBeLessThan(2000)

})