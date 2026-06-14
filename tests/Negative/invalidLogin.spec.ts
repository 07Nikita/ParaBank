import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"

test('log in with invalid username',async({page})=>{

    const loginPage=new Login(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginInvalidUser()

    await expect(page.locator('#rightPanel')).toContainText('The username and password could not be verified.')

    await page.screenshot({path:`screenshots/NEG/TC-NEG-01-invalidLogin.png`})

    
})