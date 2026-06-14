import {test, expect} from "@playwright/test"
import openSavingAccount from "../../POM/open-saving-account"
import login from "../../POM/login-logout"

test('open saving account', async ({page}) => {

    const saving = new openSavingAccount(page)

    const loginPage = new login(page)
    
    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    
    await loginPage.loginUser()
    
    await saving.OpenAccount() 
    
    await expect(page.locator('#rightPanel')).toContainText('Congratulations, your account is now open.')
    
    await page.screenshot({path:'screenshots/UI/saving.png'})

})
