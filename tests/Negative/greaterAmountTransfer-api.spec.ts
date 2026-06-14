import { test, expect } from '@playwright/test'
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test('transfer more funds via API', async ({ request }) => {

    const accountId = 12345
    const newAccountId = 12456

    let res = await request.post(`${baseURL}/transfer?fromAccountId=${accountId}&toAccountId=${newAccountId}&amount=9982537`)

    let body = await res.text()

    console.log("Status Code:", res.status())
    console.log(body)
    expect(res.status()).toBe(400)

    //! test failed
})