import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"
import transferFund from "../../POM/transfer-fund"

test.fail('Transfer Negative Amount',async({page})=>{

    const loginPage = new Login(page)
    const transfer = new transferFund(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginUser()

    await transfer.transferFundBtn.click()

    await transfer.fromAccount.selectOption({index: 0})

    await transfer.toAccount.selectOption({index: 1})

    await transfer.amount.fill('-100')

    await transfer.submitBtn.click()

    await expect(page.locator('#rightPanel h1').nth(1)).not.toHaveText('Transfer Complete!')
    //! failed 

    await page.screenshot({path: `screenshots/NEG/TC-NEG-04-negativeAmountTransfer.png`})

})