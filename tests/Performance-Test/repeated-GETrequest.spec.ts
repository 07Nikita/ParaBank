import { test, expect } from "@playwright/test"

test("accounts api repeated 20 times", async ({ request }) => {

    for(let i = 1; i <= 20; i++){

        const response = await request.get(
            'https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts'
        )

        console.log(`Request ${i} completed`)

        expect(response.ok()).toBe(true)
    }

})