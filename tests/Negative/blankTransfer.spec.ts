import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"
import transferFund from "../../POM/transfer-fund"

test('blank amount transfer',async({page})=>{

    const loginPage = new Login(page)
    const transfer = new transferFund(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginUser()

    await transfer.transferFundBtn.click()

    await transfer.fromAccount.selectOption({index: 0})

    await transfer.toAccount.selectOption({index: 1})

    await transfer.submitBtn.click()

    await expect(page.locator('[id="showError"]')).toContainText('Error!')
    //!valid message is not shown

    await page.screenshot({path:`screenshots/NEG/TC-NEG-03-blankTransfer.png`})

})