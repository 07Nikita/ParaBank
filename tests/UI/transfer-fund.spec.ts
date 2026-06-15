import { test, expect } from "@playwright/test"
import login from "../../POM/login-logout"
import transferFund from "../../POM/transfer-fund"
import accOverview from "../../POM/accOverview"


test('transfer fund', async ({ page }) => {

    const loginPage = new login(page)
    const transfer = new transferFund(page)
    const overview = new accOverview(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    await loginPage.loginUser()
    await overview.accountOverview()
    await expect(overview.accOverview).toBeVisible()
    await page.screenshot({ path:'screenshots/UI/fund-transfer/1_before-transfer.png' })
    
    await transfer.transfer()

    await expect(page.locator('#rightPanel h1').nth(1)).toHaveText('Transfer Complete!')

    await page.screenshot({ path: 'screenshots/UI/fund-transfer/2_transfer-complete.png' })

    await overview.accountOverview()
    await expect(overview.accOverview).toBeVisible()
    await page.screenshot({ path: 'screenshots/UI/fund-transfer/3_after-transfer.png' })


})