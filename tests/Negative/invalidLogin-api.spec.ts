import { test, expect } from '@playwright/test'

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test('login with invalid credentials', async ({ request }) => {

    let res = await request.get(
        `${baseURL}/login/invalid123/invalidpw`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let body = await res.text()

    console.log("Status Code:", res.status())
    console.log(body)

    expect(body).toContain("Invalid username and/or password")
})