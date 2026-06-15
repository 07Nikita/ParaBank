import { test, expect } from "@playwright/test"
import login from "../../POM/login-logout"
import openSavingAccount from "../../POM/open-saving-account"

test('open saving account and verify via api', async ({ page, request }) => {

    const loginPage = new login(page)
    const savingAccount = new openSavingAccount(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginUser()

    await savingAccount.OpenAccount()

    
    await page.screenshot({path:'screenshots/E2E/saving.png'})

    const accountId = await savingAccount.accNumber.textContent()

    console.log("New Account ID:", accountId)

    const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(response.status()).toBe(200)

    const body = await response.json()

    console.log(body)

    expect(body.id).toBe(Number(accountId))
    expect(body.type).toBe("SAVINGS")
})