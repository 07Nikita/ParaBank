import { test, expect } from "@playwright/test"
import login from "../../POM/login-logout"
import transferFund from "../../POM/transfer-fund"
import accOverview from "../../POM/accOverview"
import testData from "../../data/data.json"

test('transfer fund', async ({ page }) => {

    const loginPage = new login(page)
    const transfer = new transferFund(page)
    const overview = new accOverview(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    await loginPage.loginUser()
    await overview.accountOverview()
    await expect(overview.accOverview).toBeVisible()
    await page.screenshot({ path:'screenshots/UI/fund-transfer/1_before-transfer.png' })
    // await overview.collectData()  

    // const fromBalBefore = await overview.getAccountBalance(testData.fromAcc)
    // const toBalBefore = await overview.getAccountBalance(testData.toAcc)
    // const totalBefore = await overview.getTotalBalance()

    // console.log('BEFORE TRANSFER:')
    // console.log(`From account (${testData.fromAcc}): $${fromBalBefore}`)
    // console.log(`To account   (${testData.toAcc}):   $${toBalBefore}`)
    // console.log(`Total balance: $${totalBefore}`)

    await transfer.transfer()

    await expect(page.locator('#rightPanel h1').nth(1)).toHaveText('Transfer Complete!')

    await page.screenshot({ path: 'screenshots/UI/fund-transfer/2_transfer-complete.png' })

    await overview.accountOverview()
    await expect(overview.accOverview).toBeVisible()
    await page.screenshot({ path: 'screenshots/UI/fund-transfer/3_after-transfer.png' })

    // const transferAmount = parseFloat(testData.amount)
    // const fromBalAfter = await overview.getAccountBalance(testData.fromAcc)
    // const toBalAfter = await overview.getAccountBalance(testData.toAcc)
    // const totalAfter = await overview.getTotalBalance()

    // console.log('AFTER TRANSFER:')
    // console.log(`From account (${testData.fromAcc}): $${fromBalAfter}`)
    // console.log(`To account   (${testData.toAcc}):   $${toBalAfter}`)
    // console.log(`Total balance: $${totalAfter}`)

    // expect(fromBalAfter).toBe(fromBalBefore - transferAmount)
    // expect(toBalAfter).toBe(toBalBefore + transferAmount)
    // expect(totalAfter).toBe(totalBefore)

})