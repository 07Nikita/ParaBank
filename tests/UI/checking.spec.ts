import {test, expect} from "@playwright/test"
import openCheckinAccount from "../../POM/open-checkin-account"
import login from "../../POM/login-logout"

test('open checing acount', async ({page}) => {

    const checkin=new openCheckinAccount(page)

    const loginPage=new login(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await loginPage.loginUser()

    await checkin.OpenAccount() 

    

    await expect(page.locator('#rightPanel')).toContainText('Congratulations, your account is now open.')
    
    await page.screenshot({path:'screenshots/UI/checkin.png'})

})
