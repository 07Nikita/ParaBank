import { test, expect } from "@playwright/test"
import Registration from "../../POM/registration"
import Login from "../../POM/login-logout"
import openSavingAccount from "../../POM/open-saving-account"
import openCheckinAccount from "../../POM/open-checkin-account"
import accOverview from "../../POM/accOverview"
import transferFund from "../../POM/transfer-fund"
import RequestLoan from "../../POM/request-loan"

test('Full UI E2E Journey',async({page})=>{

    const registration = new Registration(page)
    const loginPage = new Login(page)
    const savingAccount = new openSavingAccount(page)
    const checkingAccount = new openCheckinAccount(page)
    const overview = new accOverview(page)
    const transfer = new transferFund(page)
    const loan = new RequestLoan(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await registration.navigateToRegister()

    await registration.registerUser2()


    await page.screenshot({path:`screenshots/E2E/ui/1-Registration.png`})

    // await registration.collectAccId()

    await savingAccount.OpenAccount()

    await page.screenshot({path:`screenshots/E2E/ui/2-SavingsAccount.png`})

    await checkingAccount.OpenAccount()

    await page.screenshot({path:`screenshots/E2E/ui/3-CheckingAccount.png`})

    await overview.accountOverview()

    // await overview.collectData()

    await transfer.transfer()

    await expect(page.locator('#showResult')).toContainText('Transfer Complete')

    await page.screenshot({path:`screenshots/E2E/ui/4-TransferFunds.png`})

    await loan.navigateToRequestLoan()

    await loan.applyForLoan()

    await page.screenshot({path:`screenshots/E2E/ui/5-RequestLoan.png`})

    await loginPage.logoutUser()

    await expect(page.getByRole('link',{name:'Register'})).toBeVisible()

    await page.screenshot({path:`screenshots/E2E/ui/6-Logout.png`})

})