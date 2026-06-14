import { test, expect } from "@playwright/test"
import login from "../../POM/login-logout"
import RequestLoan from "../../POM/request-loan"

test('loan', async ({page}) => {
    const requestLoan = new RequestLoan(page)
    const loginPage = new login(page)   

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    await loginPage.loginUser()
    await requestLoan.navigateToRequestLoan()
    await expect(page).toHaveURL(/requestloan.htm/)
    await requestLoan.applyForLoan()
    await expect(page.locator('#rightPanel')).toContainText('Congratulations, your loan has been approved.')
    await page.screenshot({path:'screenshots/UI/requestLoan.png'})
})

