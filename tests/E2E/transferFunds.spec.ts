import { test, expect } from "@playwright/test"
import login from "../../POM/login-logout"
import transferFund from "../../POM/transfer-fund"
import accOverview from "../../POM/accOverview"
import testData from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test('Transfer Funds and Validate Balance', async ({ page, request }) => {

    const loginPage = new login(page)
    const transfer = new transferFund(page)
    const overview = new accOverview(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginUser()

    await overview.accountOverview()

    const fromAcc = (await overview.from.textContent())?.trim()
    const toAcc = (await overview.to.textContent())?.trim()

    console.log("From Account:", fromAcc)
    console.log("To Account:", toAcc)

    const fromBeforeRes = await request.get(`${baseURL}/accounts/${fromAcc}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    const toBeforeRes = await request.get(`${baseURL}/accounts/${toAcc}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(fromBeforeRes.status()).toBe(200)
    expect(toBeforeRes.status()).toBe(200)

    const fromBeforeBody = await fromBeforeRes.json()
    const toBeforeBody = await toBeforeRes.json()

    const fromBalBefore = Number(fromBeforeBody.balance)
    const toBalBefore = Number(toBeforeBody.balance)

    console.log("Before Transfer")
    console.log("From Balance:", fromBalBefore)
    console.log("To Balance:", toBalBefore)

    await transfer.transfer()

    await expect(page.locator('#rightPanel h1').nth(1)).toHaveText('Transfer Complete!')

    const fromAfterRes = await request.get(`${baseURL}/accounts/${fromAcc}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    const toAfterRes = await request.get(`${baseURL}/accounts/${toAcc}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(fromAfterRes.status()).toBe(200)
    expect(toAfterRes.status()).toBe(200)

    const fromAfterBody = await fromAfterRes.json()
    const toAfterBody = await toAfterRes.json()

    const fromBalAfter = Number(fromAfterBody.balance)
    const toBalAfter = Number(toAfterBody.balance)

    console.log("After Transfer")
    console.log("From Balance:", fromBalAfter)
    console.log("To Balance:", toBalAfter)

    const transferAmount = Number(testData.amount)

    expect(fromBalAfter).toBe(fromBalBefore - transferAmount)

    expect(toBalAfter).toBe(toBalBefore + transferAmount)

})