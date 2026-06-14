import { test, expect } from '@playwright/test'

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test('getting details of invalid id', async ({ request }) => {

    let res = await request.get(`${baseURL}/accounts/909427384`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    console.log("Status Code:", res.status())

    let body = await res.text()

    console.log(body)

    expect(res.ok()).toBe(false)
})