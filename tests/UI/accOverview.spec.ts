import {test, expect} from "@playwright/test"
import accOverview from "../../POM/accOverview"
import login from "../../POM/login-logout"

test('account overview', async ({page}) => {

    const overview = new accOverview(page)      
    const loginPage = new login(page)
    
    await page.goto('https://parabank.parasoft.com/parabank/index.htm') 
    await loginPage.loginUser()
    await overview.accountOverview()
    
    await expect(page.locator('#rightPanel h1').first()).toHaveText('Accounts Overview')        
    await page.screenshot({path:'screenshots/UI/overview.png'})

    // await overview.collectData()
})
